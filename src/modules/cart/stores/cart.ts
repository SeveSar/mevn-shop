import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "@/modules/user/stores/user";
import { api } from "@/api/api";
import { useModalStore } from "@/stores/modal";
import type { TCart } from "@/models/ICart";
import { useProductsStore } from "../../product/stores/products";
import { getItemFromLocalstorage, setItemInLocalstorage } from "@/utils/tokenHelper";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<TCart>(getItemFromLocalstorage("CART") ?? []);
  const totalPrice = ref<number>(0);
  const inProccess = ref<string[]>([]);

  const userStore = useUserStore();

  const getCart = async () => {
    const res = await api.cart.getCart();
    cart.value = res.products;
  };

  const getIndex = (id: string) => {
    return cart.value.findIndex((item) => item._id === id);
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

  // const totalPrice = computed(() => {
  //   return cart.value.reduce((acc, item) => {
  //     return (acc += item.price);
  //   }, 0);
  // });

  const totalItems = computed(() => {
    return cart.value.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0);
  });

  const addToCart = async ({
    productId,
    dough,
    size,
    ingredientsIds,
    productPrice,
  }: {
    productId: string;
    dough: string;
    size: string;
    ingredientsIds: string[];
    productPrice: number;
  }) => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();
    const currentSize = productsStore.getActiveProduct?.sizes.find((sizePr) => sizePr.id === size);
    const currentDough = productsStore.getActiveProduct?.dough.find((doughPr) => doughPr.id === dough);

    if (!inCart(productId)) {
      const cartItem = {
        quantity: 1,
        id: productId,
        price: productPrice,
        size: currentSize,
        dough: currentDough,
        ingredients: ingredientsIds,
      };

      cart.value.push(cartItem);
      setItemInLocalstorage("CART", cart.value);
    } else {
      const product = cart.value.find((pr) => pr.id === productId);
      if (!product) return false;

      product.quantity += 1;
      product.price = productPrice * product.quantity;
      product.size = currentSize;
      product.dough = currentDough;
      product.ingredients = ingredientsIds;
      setItemInLocalstorage("CART", cart.value);
    }

    if (userStore.isLoggedIn) {
      const res = await api.cart.addToCart(productId, dough, size, ingredientsIds);
      console.log(res, "res");
    }
  };

  return {
    cart,
    getCart,
    totalItems,
    addToCart,
    totalPrice,
  };
});
