<script setup lang="ts">
import type { OrderProductDTO } from '@/models/order.dto';

interface Props {
  product: OrderProductDTO
}
const props = defineProps<Props>();
</script>

<template>
  <div class="order-product">
    <div class="order-product__header">
      <img class="order-product__img" :src="product.imageUrl">
      <div class="order-product__title">
        {{ product.title }}
      </div>
    </div>
    <div class="order-product__extra">
      {{ product.dough.title }}, {{ product.size.title }}
    </div>
    <div class="order-product__count">
      {{ product.quantity }} товар
    </div>
    <div class="order-product__price">
      {{ product.totalPrice * product.quantity }} ₽
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-product {
  display: grid;
  grid-template-columns: 350px 150px 105px max-content;
  justify-content: space-between;
  column-gap: 12px;
  font-size: 16px;
  line-height: 1.2;
  align-items: center;

  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    color: $black-color;
  }

  &__img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    flex-shrink: 0;
    margin-right: 16px;
  }

  &__extra {
    font-size: 14px;
    color: $black-color;
  }

  &__title,
  &__extra {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__count {
    color: $main-color;
    padding: 10px 20px;
    background-color: rgba($main-color, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  &__price {
    color: $main-color;
  }
}
</style>
