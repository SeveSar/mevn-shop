import { IFilter } from '@/types/IFilter';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api/api';

import type { IProduct, IProductMainPage } from '@/types/IProduct';

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProductMainPage[]>([]);
  const activeProductId = ref<string>('');
  const isLoading = ref(false);

  const getActiveProduct = computed(() => {
    return getProductById(activeProductId.value) ?? null;
  });

  const getProductById = (id: string) => {
    return products.value.find((item) => item.id === id);
  };

  const getProducts = async (filters?: string[]) => {
    try {
      isLoading.value = true;
      products.value = await api.product.fetchProducts(filters);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    getProductById,
    getActiveProduct,
    getProducts,
    products,
    activeProductId,
  };
});
