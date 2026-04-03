import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthModalStore = defineStore('authModal', () => {
  const isAuthModal = ref(false);

  const openAuthModal = () => {
    isAuthModal.value = true;
  };
  const closeAuthModal = () => {
    isAuthModal.value = false;
  };



  return {
    openAuthModal,
    closeAuthModal,
    isAuthModal,
  };
});
