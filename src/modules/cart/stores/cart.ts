import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from '@/modules/user/stores/user';
import { api } from '@/api/api';
import type { TCart } from '@/types/ICart';
import { useProductsStore } from '../../product/stores/products';
import { getItemFromLocalstorage, setItemInLocalstorage } from '@/utils/tokenHelper';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<TCart>([]);
  const isSidePanelCart = ref(false);
  const inProccess = ref<string[]>([]);

  const userStore = useUserStore();

  const getCart = async () => {
    if (userStore.isLoggedIn) {
      const res = await api.cart.getCart();
      cart.value = res.products;
      setItemInLocalstorage('CART', cart.value);
    } else {
      cart.value = getItemFromLocalstorage('CART') ?? [];
    }
  };

  const getIndex = (id: string) => {
    return cart.value.findIndex((item) => item.id === id);
  };

  const inCart = (id: string) => {
    return getIndex(id) !== -1;
  };

  const inProccessing = (id: string) => {
    return inProccess.value.includes(id);
  };

  const getItem = (id: string) => cart.value.find((item) => item.id === id);

  const canAdd = (id: string) => {
    return !inProccessing(id) && !inCart(id);
  };

  const canDel = (id: string) => {
    return !inProccessing(id) && inCart(id);
  };

  const canUpdate = (id: string) => {
    return !inProccessing(id) && inCart(id);
  };

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => {
      return (acc += item.totalPrice);
    }, 0);
  });

  const totalItems = computed(() => {
    return cart.value.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0);
  });

  const calculateTotalPriceProduct = ({
    idProduct,
    ingredients,
    dough,
    size,
    quantity = 1,
  }: {
    idProduct: string;
    ingredients: IIngredientItem[];
    dough: IDoughItem;
    size: ISizeItem;
    quantity?: number;
  }) => {
    const productsStore = useProductsStore();
    const product = productsStore.products.find((pr) => pr.id === idProduct);
    if (!product) return 0;
    const ingredientsPrice = ingredients.reduce((sum, item) => {
      if (item.isActive) {
        return (sum += item.price);
      }
      return sum;
    }, 0);

    const price = product.price + dough.price + size.price + ingredientsPrice;
    return price * quantity;
  };

  const addToCart = async ({ dough, size, ingredients }: { dough: IDoughItem; size: ISizeItem; ingredients: IIngredientItem[] }) => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();

    if (!inCart(productsStore.activeProductId)) {
      cart.value.push({
        title: productsStore.getActiveProduct?.title ?? '',
        imageUrl: productsStore.getActiveProduct?.imageUrl ?? '',
        quantity: 1,
        id: productsStore.activeProductId,
        totalPrice: calculateTotalPriceProduct({ size, dough, idProduct: productsStore.activeProductId, ingredients }),
        size,
        dough,
        ingredients,
      });
      setItemInLocalstorage('CART', cart.value);
    } else {
      const productCart = cart.value.find((pr) => pr.id === productsStore.activeProductId);
      if (!productCart) return;

      productCart.quantity += 1;
      productCart.totalPrice = calculateTotalPriceProduct({
        size,
        dough,
        idProduct: productsStore.activeProductId,
        ingredients,
        quantity: productCart.quantity,
      });
      productCart.size = size;
      productCart.dough = dough;
      productCart.ingredients = ingredients;
      setItemInLocalstorage('CART', cart.value);
    }

    if (userStore.isLoggedIn) {
      const ingredientsIds = ingredients.map((item) => item.id);
      const res = await api.cart.addToCart(productsStore.activeProductId, dough.id, size.id, ingredientsIds);
    }
  };

  const updateCnt = ({ newQuantity, idProduct }: { newQuantity: number; idProduct: string }) => {
    const productCart = cart.value.find((item) => item.id === idProduct);
    if (!productCart) return;
    productCart.quantity = newQuantity;
    productCart.totalPrice = calculateTotalPriceProduct({
      quantity: newQuantity,
      idProduct,
      size: productCart.size,
      dough: productCart.size,
      ingredients: productCart.ingredients,
    });
  };

  return {
    calculateTotalPriceProduct,
    cart,
    getCart,
    totalItems,
    addToCart,
    useProductsStore,
    totalPrice,
    updateCnt,
    isSidePanelCart,
  };
});
