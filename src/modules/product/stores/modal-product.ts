import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalProductStore = defineStore('modal-product', () => {
  const isModalProduct = ref(false);

  const openProductModal = () => {
    isModalProduct.value = true;
  };
  const closeProductModal = () => {
    isModalProduct.value = false;
  };

  return {
    isModalProduct,
    openProductModal,
    closeProductModal,
  };
});
