<script lang="ts" setup>
import { ref } from 'vue';
import ProductBlock from '../../components/ProductBlock/ProductBlock.vue';

import ProductList from '../../components/ProductList/ProductList.vue';
import ProductSkeleton from '../../components/ProductList/ProductSkeleton.vue';

import SidePanelProductFilter from '../../components/sidePanels/SidePanelProductFilter/SidePanelProductFilter.vue';
import { useProductsStore } from '../../stores';

// state

const isProductFilterPanel = ref(false);
const productsStore = useProductsStore();

async function fetchData() {
  await productsStore.getProducts();
}

fetchData();
</script>

<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList
        v-if="productsStore.products.length && !productsStore.isLoading"
        :products="productsStore.products"
      />
      <span v-else-if="!productsStore.products.length && !productsStore.isLoading">not found...</span>
      <ProductSkeleton v-else :count="8" />
    </ProductBlock>
  </div>
  <teleport to="body">
    <SidePanelProductFilter v-model:is-open="isProductFilterPanel" />
  </teleport>
</template>

<style lang="scss">
.products {
  padding-bottom: 60px;
}
</style>
