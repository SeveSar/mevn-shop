import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from '@/modules/user/stores/user';
import { api } from '@/api/api';
import type { TCart } from '@/models/ICart';
import { useProductsStore } from '../../product/stores/products';
import { getItemFromLocalstorage, setItemInLocalstorage } from '@/utils/tokenHelper';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/models/IProduct';

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

  const addToCart = async ({
    title,
    productId,
    dough,
    size,
    ingredients,

    imageUrl,
  }: {
    title: string;
    productId: string;
    dough: string;
    size: string;
    ingredients: IIngredientItem[];
    imageUrl: string;
  }) => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();
    const currentSize = productsStore.getActiveProduct?.sizes.find((sizePr) => sizePr.id === size) as ISizeItem;
    const currentDough = productsStore.getActiveProduct?.dough.find((doughPr) => doughPr.id === dough) as IDoughItem;

    if (!inCart(productId)) {
      cart.value.push({
        title,
        imageUrl,
        quantity: 1,
        id: productId,
        totalPrice: calculateTotalPriceProduct({ size: currentSize, dough: currentDough, idProduct: productId, ingredients }),
        size: currentSize,
        dough: currentDough,
        ingredients,
      });
      setItemInLocalstorage('CART', cart.value);
    } else {
      const productCart = cart.value.find((pr) => pr.id === productId);
      if (!productCart) return;

      productCart.quantity += 1;
      productCart.totalPrice = calculateTotalPriceProduct({
        size: currentSize,
        dough: currentDough,
        idProduct: productId,
        ingredients,
        quantity: productCart.quantity,
      });
      productCart.size = currentSize;
      productCart.dough = currentDough;
      productCart.ingredients = ingredients;
      setItemInLocalstorage('CART', cart.value);
    }

    if (userStore.isLoggedIn) {
      const ingredientsIds = ingredients.map((item) => item.id);
      const res = await api.cart.addToCart(productId, dough, size, ingredientsIds);
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
