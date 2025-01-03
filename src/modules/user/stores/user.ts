import type { IUser } from '@/types/IUser';
import { api } from '@/api/api';
import { useCartStore } from '@/modules/cart';
import { cleanTokensData, clearAll, getItemFromLocalstorage, setToken } from '@/utils/localstorage';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore();
  const user = ref<IUser | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  async function login(email: string, password: string) {
    const data = await api.user.login(email, password, getItemFromLocalstorage('CART'));

    user.value = data.user;
    setToken(data.accessToken);

    cartStore.getCart();
  }

  async function signUp(email: string, password: string) {
    const data = await api.user.register(email, password, getItemFromLocalstorage('CART'));
    user.value = data.user;
    setToken(data.accessToken);
    return data;
  }

  async function auth() {
    try {
      const data = await api.user.refresh();
      if (data) {
        user.value = data.user;
      }
      cartStore.getCart();
    }
    catch (e) {
      cleanTokensData();
      console.error(e);
    }
  }

  async function logOut() {
    await api.user.logOut();
    cartStore.cart = [];
    clearAll();
    user.value = null;
  }

  return {
    login,
    signUp,
    isLoggedIn,
    user,
    logOut,
    auth,
  };
});
