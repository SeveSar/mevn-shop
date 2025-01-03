import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthModal = defineStore('authModal', () => {
  const isAuthModal = ref(false);
  const isModalProduct = ref(false);

  const openAuthModal = () => {
    isAuthModal.value = true;
  };
  const closeAuthModal = () => {
    isAuthModal.value = false;
  };

  const openProductModal = () => {
    isModalProduct.value = true;
  };
  const closeProductModal = () => {
    isModalProduct.value = false;
  };

  return {
    openAuthModal,
    closeAuthModal,
    openProductModal,
    closeProductModal,
    isAuthModal,
    isModalProduct,
  };
});
