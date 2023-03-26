import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";

import type { IProduct } from "@/models/IProduct";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const activeProduct = ref<IProduct | null>(null);

  const getProductById = () => {
    return function (id: number | string): IProduct | undefined {
      return products.value.find((item) => item.id === id);
    };
  };

  const getProducts = async (filters: string[]) => {
    const dataProducts = await api.product.fetchProducts(filters);
    products.value = dataProducts;
  };

  const setActiveProduct = (product: IProduct) => {
    activeProduct.value = product;
  };

  const resetActiveProduct = () => {
    activeProduct.value = null;
  };

  return {
    getProductById,
    getProducts,
    products,
    activeProduct,
    setActiveProduct,
    resetActiveProduct,
  };
});
