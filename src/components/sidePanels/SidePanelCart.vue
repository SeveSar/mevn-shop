<template>
  <BaseSidePanel
    :isOpen="cartStore.isSidePanelCart"
    @close="cartStore.isSidePanelCart = false"
    class="panel-cart"
    title="Ваш заказ"
  >
    <template #default>
      <div class="panel-cart__list">
        <CartItem isMinni :item="item" v-for="item in cartStore.cart" :key="item.id" />
      </div>
    </template>
    <template #footer>
      <div class="panel-cart__actions">
        <div class="panel-cart__price">Итого: {{ cartStore.totalPrice }} ₽</div>
        <BaseButton :to="{ name: RouteNamesEnum.cart }">Оформить заказ</BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

<script setup lang="ts">
import BaseSidePanel from '@/components/ui/BaseSidePanel.vue';
import CartItem from '../widgets/cart/CartItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useCartStore } from '@/modules/cart/stores/cart';
import { RouteNamesEnum } from '@/router/router.types';

const cartStore = useCartStore();
</script>

<style scoped lang="less">
.panel-cart {
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: @main-color;
  }
}
</style>
