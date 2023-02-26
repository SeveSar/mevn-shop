<template>
  <div class="products">
    <ProductBlock @click-filter="isProductFilterPanel = true">
      <ProductList :products="filteredProducts" />
    </ProductBlock>
  </div>
  <PanelProductFilter
    v-model="isProductFilterPanel"
    :filters="productFilters"
  />
</template>

<script lang="ts">
import ProductList from "../../components/ProductList/ProductList.vue";

import ProductBlock from "../../components/ProductBlock/ProductBlock.vue";
import PanelProductFilter from "@/components/modals/PanelProductFilter/PanelProductFilter.vue";
import { useProductsStore } from "@/stores/products";
import { computed } from "vue";
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
    let productFilters = ref([]);
    let isProductFilterPanel = ref(false);
    const productsStore = useProductsStore();

    const filteredProducts = computed(() => {
      return productsStore.products;
    });

    const onClick = (category: number) => {
      currentCategory.value = category;
    };
    const getProductFilters = async () => {
      productFilters.value = await api.product.fetchProductFilters();
    };
    getProductFilters();
    return {
      filteredProducts,
      onClick,
      currentCategory,
      productFilters,
      isProductFilterPanel,
    };
  },
});
</script>
