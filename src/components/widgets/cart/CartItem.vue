<template>
  <div class="product" :class="{ 'product--minni': isMinni }">
    <div class="product__content">
      <img :src="item.imageUrl" alt="" class="product__img" />
      <div class="product__content-row">
        <div class="product__content-col">
          <div class="product__info">
            <h4 class="product__name">{{ item.title }}</h4>
            <div class="product__descr">{{ item.dough.title }}, {{ item.size.title }}</div>
          </div>
        </div>
        <div class="product__content-col product__content-info">
          <div class="product__actions">
            <button
              class="product__actions-btn"
              :disabled="item.quantity <= 1"
              @click="cartStore.updateCnt({ idProduct: item.id, newQuantity: item.quantity - 1 })"
            >
              -
            </button>
            <input type="number" readonly :value="item.quantity" min="1" />
            <button
              class="product__actions-btn"
              @click="cartStore.updateCnt({ idProduct: item.id, newQuantity: item.quantity + 1 })"
            >
              +
            </button>
          </div>

          <div class="product__price">{{ item.totalPrice * item.quantity }} ₽</div>
        </div>
      </div>
    </div>

    <button class="product__remove" @click="cartStore.removeItem(item.id)">
      <AppIcon name="IconCrossBig" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ICartItem } from '@/types/ICart';

import AppIcon from '@/components/ui/AppIcon/AppIcon.vue';
import { useCartStore } from '@/modules/cart/stores/cart';

interface Props {
  isMinni: boolean;
  item: ICartItem;
}

const cartStore = useCartStore();
const props = withDefaults(defineProps<Props>(), {
  isMinni: false,
});
</script>

<style lang="less" scoped>
.product {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  color: #191919;
  padding: 15px 24px 15px 16px;
  margin-bottom: 16px;
  position: relative;

  &__content {
    display: flex;
    align-items: center;

    &-row {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-info {
      display: flex;
      align-items: center;
    }
  }

  &__remove {
    position: absolute;
    right: 16px;
    top: 10px;
    color: @main-color;
    svg {
      width: 15px;
    }
  }

  &__descr {
    margin-top: 8px;
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    @media screen and (max-width: 575px) {
      font-size: 15px;
      line-height: 18px;
      margin-bottom: 1px;
    }
  }

  &__img {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    margin-right: 15px;
    object-fit: contain;
    display: block;
    @media screen and (max-width: 575px) {
      width: 70px;
      height: 70px;
      margin-right: 8px;
    }
  }

  &__actions {
    display: flex;
    background: #ffeee2;
    border-radius: 6px;
    align-items: center;
    height: 36px;
    padding: 0 6px;
    margin-right: 40px;
    max-width: 92px;

    &-btn {
      color: #ff7010;
      font-size: 24px;
      border-radius: 1px;

      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s linear;
      &:active {
        transform: translateY(1px);
      }
    }

    input {
      width: 40px;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #ff7010;
      margin: 0 5px;
    }
  }
  &__price {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #ff7010;
    margin-left: auto;
  }

  &--minni {
    .product__img {
      width: 90px;
      height: 90px;
    }

    .product__name {
      font-size: 16px;
      line-height: 20px;
      max-width: 255px;
    }

    .product__content-row {
      display: block;
    }

    .product__content-info {
      margin-top: 10px;
    }
  }
}
</style>
