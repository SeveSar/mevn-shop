import type { ProductDTO } from '../models';
import { api } from '@/api/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductDTO[]>([]);
  const activeProductId = ref<string>('');
  const isLoading = ref(false);

  const getProductById = (id: string) => {
    return products.value.find(item => item.id === id);
  };

  const getActiveProduct = computed(() => {
    return getProductById(activeProductId.value) ?? null;
  });

  const getProducts = async (filters?: string[]) => {
    try {
      isLoading.value = true;
      products.value = await api.product.fetchProducts(filters);
    }
    catch (e) {
      console.error(e);
    }
    finally {
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
