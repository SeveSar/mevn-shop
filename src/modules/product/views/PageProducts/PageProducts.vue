<template>
  <div class="products">
    <AppFilter @buttonClick="onClick" :currentCategory="currentCategory" />
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script setup lang="ts">
import ProductList from "../../components/ProductList/ProductList.vue";
import AppFilter from "../../components/ProductFilter/ProductFilter.vue";
import { useProductsStore } from "@/stores/products";
import { computed } from "vue";
import { ref } from "vue";

//state
let currentCategory = ref<number>(0);
const onClick = (category: number) => {
  currentCategory.value = category;
};

const productsStore = useProductsStore();
const filteredProducts = computed(() => {
  return productsStore.products.filter((item) => {
    if (currentCategory.value !== 0) {
      return item.category === currentCategory.value;
    }
    return true;
  });
});
</script>
