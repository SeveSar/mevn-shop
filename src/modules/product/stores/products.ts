import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";

import type { IProduct } from "@/models/IProduct";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const activeProductId = ref<string>("");

  const getProductById = (id: string) => {
    return products.value.find((item) => item.id === id);
  };

  const getProducts = async (filters: string[]) => {
    const dataProducts = await api.product.fetchProducts(filters);
    products.value = dataProducts;
  };

  const getActiveProduct = computed(() => {
    return getProductById(activeProductId.value ?? products.value[0].id);
  });

  const setActiveProductId = (id: string) => {
    activeProductId.value = id;
  };
  const updateIngredientsById = (id: string) => {
    if (!getActiveProduct.value) return;

    const ingredientItem = getActiveProduct.value.ingredients.find(
      (item) => item.id === id
    );
    if (!ingredientItem) return;

    ingredientItem.isActive = !ingredientItem.isActive;
  };

  const resetProductIngredients = () => {
    if (!getActiveProduct.value) return;

    getActiveProduct.value.ingredients = getActiveProduct.value.ingredients.map(
      (item) => {
        return {
          ...item,
          isActive: false,
        };
      }
    );
    activeProductId.value = "";
  };

  return {
    getProductById,
    getActiveProduct,
    getProducts,
    products,
    activeProductId,
    setActiveProductId,
    resetProductIngredients,
    updateIngredientsById,
  };
});
