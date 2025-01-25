<script lang="ts">
import type { PropType } from 'vue';
import type { ProductDTO } from '../../models';
import { defineComponent } from 'vue';
import ProductListItem from '../../components/ProductList/ProductListItem.vue';

export default defineComponent({
  components: {
    ProductListItem,
  },
  props: {
    products: {
      type: Array as PropType<ProductDTO[]>,
      default: () => [],
    },
  },
});
</script>

<template>
  <ul v-if="products?.length" class="list-product">
    <li v-for="product in products" :key="product.id" class="list-product__item">
      <ProductListItem :product="product" />
    </li>
  </ul>
</template>

<style lang="less" scoped>
.list-product {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  &__item {
    flex: 0 0 calc((100% - 3 * 30px) / 4);
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease-in-out;

    @media screen and (max-width: @breakpoint-xl) {
      flex: 0 0 calc((100% - 2 * 30px) / 3);
    }
    @media screen and (max-width: @breakpoint-lg) {
      flex: 0 0 calc((100% - 1 * 30px) / 2);
    }
    @media screen and (max-width: @breakpoint-sm) {
      flex: 0 0 100%;
      padding: 0;
    }
    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>
