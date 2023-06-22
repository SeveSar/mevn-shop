import { computed, toRefs, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api/api';
import { setToken, cleanTokensData, getItemFromLocalstorage } from '@/utils/tokenHelper';
import type { IUser } from '@/types/IUser';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  async function login(email: string, password: string) {
    const data = await api.user.login(email, password, getItemFromLocalstorage('CART'));
    user.value = data.user;
    setToken(data.accessToken);
  }
  async function signUp(email: string, password: string) {
    const data = await api.user.register(email, password);
    user.value = data.user;
    setToken(data.accessToken);
    return data;
  }

  async function auth() {
    try {
      const res = await api.user.refresh();
      if (res) {
        user.value = res.data.user;
        setToken(res.data.accessToken);
      }
    } catch (e) {
      cleanTokensData();
      console.log(e);
    }
  }

  async function logOut() {
    await api.user.logOut();
    cleanTokensData();
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
