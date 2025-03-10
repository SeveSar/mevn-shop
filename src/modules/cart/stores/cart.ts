import type { TCart } from '@/types/ICart';
import type { IDoughItem, IIngredientItem, ISizeItem } from '@/types/IProduct';
import { api } from '@/api/api';
import { useUserStore } from '@/modules/user/stores/user';
import {
  getItemFromLocalstorage,
  removeItem as removeItemFromStorage,
  setItemInLocalstorage,
} from '@/utils/localstorage';
import debounce from 'lodash/debounce';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useProductsStore } from '../../product/stores';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<TCart>([]);
  const isSidePanelCart = ref(false);

  const userStore = useUserStore();

  const getCart = async () => {
    if (userStore.isLoggedIn) {
      const res = await api.cart.getCart();
      cart.value = res.products;
      setItemInLocalstorage('CART', cart.value);
    }
    else {
      cart.value = getItemFromLocalstorage('CART') ?? [];
    }
  };

  const getIndex = (id: string) => {
    return cart.value.findIndex(item => item.id === id);
  };

  const inCart = (id: string) => {
    return getIndex(id) !== -1;
  };

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => {
      return (acc += item.totalPrice * item.quantity);
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
  }: {
    idProduct: string
    ingredients: IIngredientItem[]
    dough: IDoughItem
    size: ISizeItem
  }) => {
    const productsStore = useProductsStore();
    const product = productsStore.products.find(pr => pr.id === idProduct);
    if (!product) { return 0; }
    const ingredientsPrice = ingredients.reduce((sum, item) => {
      if (item.isActive) {
        return (sum += item.price);
      }
      return sum;
    }, 0);

    const price = product.price + dough.price + size.price + ingredientsPrice;
    return price;
  };

  const addToCart = async ({
    dough,
    size,
    ingredients,
  }: {
    dough: IDoughItem
    size: ISizeItem
    ingredients: IIngredientItem[]
  }) => {
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
    }
    else {
      const productCart = cart.value.find(pr => pr.id === productsStore.activeProductId);
      if (!productCart) { return; }

      productCart.quantity += 1;
      productCart.totalPrice = calculateTotalPriceProduct({
        size,
        dough,
        idProduct: productsStore.activeProductId,
        ingredients,
      });
      productCart.size = size;
      productCart.dough = dough;
      productCart.ingredients = ingredients;
      setItemInLocalstorage('CART', cart.value);
    }

    if (userStore.isLoggedIn) {
      const ingredientsIds = ingredients.map(item => item.id);

      await api.cart.addToCart(productsStore.activeProductId, dough.id, size.id, ingredientsIds);
    }
  };

  const debouncedFetchUpdateCnt = debounce(async (updatedProduct) => {
    try {
      return await api.cart.updateProduct(updatedProduct);
    }
    catch (e) {
      console.log(e, 'eee');
      throw e;
    }
  }, 300);

  const updateCnt = async ({ newQuantity, idProduct }: { newQuantity: number, idProduct: string }) => {
    const productCart = cart.value.find(item => item.id === idProduct);

    if (!productCart) { return; }

    if (userStore.isLoggedIn) {
      try {
        debouncedFetchUpdateCnt({ idProduct, updatedProduct: { quantity: newQuantity } });
        productCart.quantity = newQuantity;
        setItemInLocalstorage('CART', cart.value);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      productCart.quantity = newQuantity;
      setItemInLocalstorage('CART', cart.value);
    }
  };

  const removeItem = async (id: string) => {
    if (!inCart(id)) { return false; }

    cart.value = cart.value.filter(item => item.id !== id);
    setItemInLocalstorage('CART', cart.value);

    if (userStore.isLoggedIn) {
      await api.cart.removeProduct(id);
    }
  };

  const clearCart = () => {
    cart.value = [];
    removeItemFromStorage('CART');
  };
  return {
    removeItem,
    calculateTotalPriceProduct,
    cart,
    getCart,
    totalItems,
    addToCart,
    useProductsStore,
    totalPrice,
    updateCnt,
    isSidePanelCart,
    clearCart,
  };
});
