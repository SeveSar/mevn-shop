import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";

import type { IProduct } from "@/models/IProduct";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const activeProductId = ref<string>("");

  const getActiveProduct = computed(() => {
    return getProductById(activeProductId.value) ?? null;
  });

  const getProductById = (id: string) => {
    return products.value.find((item) => item.id === id);
  };

  const getProducts = async (filters?: string[]) => {
    products.value = await api.product.fetchProducts(filters);
  };

  return {
    getProductById,
    getActiveProduct,
    getProducts,
    products,
    activeProductId,
  };
});
