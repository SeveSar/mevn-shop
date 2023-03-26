<template>
  <div class="wrap">
    <div class="big-product" v-if="hasProduct">
      <img :src="product?.imageUrl" alt="" />
      <h1 class="big-product__name">{{ product?.name }}</h1>
      <div class="big-product__rating">Рейтинг: {{ product?.rating }}</div>
      <div class="big-product__sizes">
        <div v-for="size in product?.sizes" :key="size.id">
          {{ size.size }} см
        </div>
      </div>
    </div>
    <AppError title="Ошибка 404. Продукт не найден" v-else />
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed, defineComponent } from "vue";
import AppError from "@/components/common/AppError.vue";
import { useProductsStore } from "@/modules/product/stores/products";

export default defineComponent({
  setup() {
    const route = useRoute();
    const productsStore = useProductsStore();
    const productId = computed(() => route.params.id);
    const product = computed(() => {
      return productsStore.getItemById(+productId.value);
    });
    const hasProduct = computed(() => {
      return typeof product.value !== "undefined";
    });
    return {
      product,
      hasProduct,
    };
  },
  components: {
    AppError,
  },
});
</script>

<style scoped lang="less">
@import "./style.scss";
</style>
