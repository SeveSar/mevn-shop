import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const loginModal = ref(false);
  const isModalProduct = ref(false);

  const openLoginModal = () => {
    loginModal.value = true;
  };
  const closeLoginModal = () => {
    loginModal.value = false;
  };

  const openProductModal = () => {
    isModalProduct.value = true;
  };
  const closeProductModal = () => {
    isModalProduct.value = false;
  };

  return {
    openLoginModal,
    closeLoginModal,
    openProductModal,
    closeProductModal,
    loginModal,
    isModalProduct,
  };
});
