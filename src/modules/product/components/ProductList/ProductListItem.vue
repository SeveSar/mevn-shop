<template>
  <article class="product">
    <router-link
      :to="{ name: 'Product', params: { id: product.id } }"
      class="product__img"
    >
      <img :src="(product.imageUrl as string)" />
    </router-link>
    <div class="product__body">
      <h4 class="product__name">
        {{ product.title }}
      </h4>

      <div class="product__descr">
        {{ product.description }}
      </div>

      <!-- <div class="product__text">Рейтинг: {{ product.rating }}</div> -->
    </div>
    <div class="product__actions">
      <BaseButton
        v-if="!userCartStore.inCart(product.id)"
        @click="userCartStore.addToCart(product.id)"
      >
        Добавить
      </BaseButton>
      <BaseButton
        color="red"
        v-else
        @click="userCartStore.delFromCart(product.id)"
      >
        Удалить
      </BaseButton>
      <div class="product__price">{{ product.price }} ₽</div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import { useProductsStore } from "@/modules/product/stores/products";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useCartStore } from "@/stores/cart";
import type { IProduct } from "../../../../models/IProduct";

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup() {
    const productsStore = useProductsStore();
    const userCartStore = useCartStore();
    return {
      productsStore,
      userCartStore,
    };
  },
});
</script>

<style scoped lang="less">
.product {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 20px;

  &__img {
    position: relative;
    padding-bottom: 91.7%;
    margin: 0 auto;
    width: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__body {
    margin-top: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__price {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #ff7010;
  }

  &__name {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: @black-color;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__descr {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: @black-color;
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &__actions {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .button {
      min-width: 131px;
    }
  }
}
</style>