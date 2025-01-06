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
  margin: 0 -15px;
  @media screen and (max-width: 575px) {
    margin: 0;
  }
  &__item {
    width: calc(100% / 4);
    padding: 0 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease-in-out;
    @media screen and (max-width: 1200px) {
      width: calc(100% / 3);
    }
    @media screen and (max-width: 875px) {
      width: calc(100% / 2);
    }
    @media screen and (max-width: 575px) {
      width: 100%;
      padding: 0;
    }
    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>
