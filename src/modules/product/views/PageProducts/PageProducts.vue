<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList
        :products="productsStore.products"
        v-if="productsStore.products.length && !productsStore.isLoading"
      />
      <span v-else-if="!productsStore.products.length && !productsStore.isLoading">not found...</span>
      <ProductSkeleton v-else :count="8" />
    </ProductBlock>
  </div>
  <teleport to="body">
    <SidePanelProductFilter v-model:isOpen="isProductFilterPanel" />
  </teleport>
</template>

<script lang="ts" setup>
import ProductList from '../../components/ProductList/ProductList.vue';

import ProductBlock from '../../components/ProductBlock/ProductBlock.vue';
import SidePanelProductFilter from '../../components/sidePanels/SidePanelProductFilter/SidePanelProductFilter.vue';

import { useProductsStore } from '../../stores/products';
import ProductSkeleton from '../../components/ProductList/ProductSkeleton.vue';

import { ref } from 'vue';

//state

let isProductFilterPanel = ref(false);
const productsStore = useProductsStore();

const fetchData = async () => {
  await productsStore.getProducts();
};

fetchData();
</script>
