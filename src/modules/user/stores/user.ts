import type { IUser } from '@/types/IUser';
import { api } from '@/api/api';
import { useCartStore } from '@/modules/cart';
import { RouteNamesEnum } from '@/router/router.types';
import { cleanTokensData, clearAll, getItemFromLocalstorage, setToken } from '@/utils/localstorage';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore();
  const user = ref<IUser | null>(null);
  const router = useRouter();

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

  function logOut() {
    api.user.logOut().then(() => {
      cartStore.cart = [];
      clearAll();
      user.value = null;
      router.push({ name: RouteNamesEnum.products });
    }).catch((e) => {
      console.log(e);
    });
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
