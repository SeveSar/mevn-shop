import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/api/api";

import type { IProductDTO } from "@/models/IProduct";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProductDTO[]>([]);
  const activeProductId = ref<string>("");

  const getActiveProduct = computed(() => {
    return getProductById(activeProductId.value ?? products.value[0].id);
  });

  const getProductById = (id: string) => {
    return products.value.find((item) => item.id === id);
  };

  const getProducts = async (filters?: string[]) => {
    products.value = await api.product.fetchProducts(filters);
    console.log(products.value);
  };

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
