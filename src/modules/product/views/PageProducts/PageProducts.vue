<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList
        :products="productsStore.products"
        v-if="productsStore.products.length && !productsStore.isLoading"
      />
      <ProductSkeleton v-else :count="8" />
    </ProductBlock>
  </div>
  <teleport to="body">
    <SidePanelProductFilter v-model:modal="isProductFilterPanel" />
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

import { ref, watch } from 'vue';

//state

let isProductFilterPanel = ref(false);
const productsStore = useProductsStore();

const fetchData = async () => {
  await productsStore.getProducts();
};

fetchData();
</script>
