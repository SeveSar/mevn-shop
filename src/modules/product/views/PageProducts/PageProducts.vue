<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList :products="productsStore.products" />
    </ProductBlock>
  </div>
  <PanelProductFilter v-model="isProductFilterPanel" :filters="productFilters" />
</template>

<script lang="ts">
import ProductList from "../../components/ProductList/ProductList.vue";

import ProductBlock from "../../components/ProductBlock/ProductBlock.vue";
import PanelProductFilter from "@/modules/product/components/modals/PanelProductFilter/PanelProductFilter.vue";
import { useProductsStore } from "@/modules/product/stores/products";

import { ref, defineComponent } from "vue";
import { api } from "@/api/api";

export default defineComponent({
  components: {
    ProductBlock,
    ProductList,
    PanelProductFilter,
  },
  setup() {
    //state
    let currentCategory = ref<number>(0);
    let productFilters = ref<any>([]);
    let isProductFilterPanel = ref(false);
    const productsStore = useProductsStore();

    const onClick = (category: number) => {
      currentCategory.value = category;
    };

    const fetchData = async () => {
      const res = await Promise.all([api.product.fetchProductFilters(), productsStore.getProducts()]);
      productFilters.value = res[0];
    };

    fetchData();
    return {
      productsStore,
      onClick,
      currentCategory,
      productFilters,
      isProductFilterPanel,
    };
  },
});
</script>
