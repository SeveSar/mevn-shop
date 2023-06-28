<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList :products="productsStore.products" v-if="productsStore.products.length && !isLoading" />
      <ProductSkeleton v-else :count="8" />
    </ProductBlock>
  </div>
  <teleport to="body">
    <SidePanelProductFilter v-model="isProductFilterPanel" :filters="productFilters" />
    <SidePanelCart />
  </teleport>
</template>

<script lang="ts" setup>
import ProductList from '../../components/ProductList/ProductList.vue';

import ProductBlock from '../../components/ProductBlock/ProductBlock.vue';
import SidePanelProductFilter from '../../components/sidePanels/SidePanelProductFilter/SidePanelProductFilter.vue';
import SidePanelCart from '@/components/sidePanels/SidePanelCart.vue';
import { useProductsStore } from '@/modules/product/stores/products';
import ProductSkeleton from '../../components/ProductList/ProductSkeleton.vue';

import { ref } from 'vue';
import { api } from '@/api/api';

//state

let productFilters = ref<any>([]);
let isProductFilterPanel = ref(false);
const productsStore = useProductsStore();
const isLoading = ref(false);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const res = await productsStore.getProducts();
    productFilters.value = res;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

fetchData();
</script>
