<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList :products="productsStore.products" />
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

import { ref } from 'vue';
import { api } from '@/api/api';

//state

let productFilters = ref<any>([]);
let isProductFilterPanel = ref(false);
const productsStore = useProductsStore();

const fetchData = async () => {
  const res = await Promise.all([api.product.fetchProductFilters(), productsStore.getProducts()]);
  productFilters.value = res[0];
};

fetchData();
</script>
