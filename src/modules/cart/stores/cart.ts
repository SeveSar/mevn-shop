import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "@/modules/user/stores/user";
import { api } from "@/api/api";
import type { TCart } from "@/models/ICart";
import { useProductsStore } from "../../product/stores/products";
import { getItemFromLocalstorage, setItemInLocalstorage } from "@/utils/tokenHelper";
import type { IDoughItem, IIngredientItem, ISizeItem } from "@/models/IProduct";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<TCart>([]);

  const inProccess = ref<string[]>([]);

  const userStore = useUserStore();

  const getCart = async () => {
    if (userStore.isLoggedIn) {
      const res = await api.cart.getCart();
      cart.value = res.products;
      setItemInLocalstorage("CART", cart.value);
    } else {
      cart.value = getItemFromLocalstorage("CART") ?? [];
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

  const addToCart = async ({
    productId,
    dough,
    size,
    ingredients,
    productPrice,
  }: {
    productId: string;
    dough: string;
    size: string;
    ingredients: IIngredientItem[];
    productPrice: number;
  }) => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();
    const currentSize = productsStore.getActiveProduct?.sizes.find((sizePr) => sizePr.id === size) as ISizeItem;
    const currentDough = productsStore.getActiveProduct?.dough.find((doughPr) => doughPr.id === dough) as IDoughItem;

    if (!inCart(productId)) {
      cart.value.push({
        quantity: 1,
        id: productId,
        totalPrice: productPrice,
        size: currentSize,
        dough: currentDough,
        ingredients,
      });
      setItemInLocalstorage("CART", cart.value);
    } else {
      const product = cart.value.find((pr) => pr.id === productId);
      if (!product) return false;

      product.quantity += 1;
      product.totalPrice = productPrice * product.quantity;
      product.size = currentSize;
      product.dough = currentDough;
      product.ingredients = ingredients;
      setItemInLocalstorage("CART", cart.value);
    }

    if (userStore.isLoggedIn) {
      const ingredientsIds = ingredients.map((item) => item.id);
      const res = await api.cart.addToCart(productId, dough, size, ingredientsIds);
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
