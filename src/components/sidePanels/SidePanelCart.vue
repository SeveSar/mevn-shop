<script setup lang="ts">
import BaseSidePanel from '@/components/ui/BaseSidePanel.vue';
import { useCartStore } from '@/modules/cart';
import { useAuthModalStore, useUserStore } from '@/modules/user';
import { RouteNamesEnum } from '@/router/router.types';
import { BaseButton } from 'pizza-mevn-ui-kit';
import { useRouter } from 'vue-router';
import CartItem from '../widgets/cart/CartItem.vue';

const cartStore = useCartStore();
const userStore = useUserStore();
const authModalStore = useAuthModalStore();
const router = useRouter();

function onSubmit() {
  if (!userStore.isLoggedIn) {
    cartStore.isSidePanelCart = false;
    authModalStore.isAuthModal = true;
  }
  else {
    router.push({ name: RouteNamesEnum.cart });
  }
}
</script>

<template>
  <BaseSidePanel
    :is-open="cartStore.isSidePanelCart"
    class="panel-cart"
    title="Ваш заказ"
    @close="cartStore.isSidePanelCart = false"
  >
    <template #default>
      <div class="panel-cart__list">
        <CartItem v-for="item in cartStore.cart" :key="item.id" is-minni :item="item" />
      </div>
    </template>
    <template #footer>
      <div class="panel-cart__actions">
        <div class="panel-cart__price">
          Итого: {{ cartStore.totalPrice }} ₽
        </div>
        <BaseButton @click="onSubmit">
          Оформить заказ
        </BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

<style scoped lang="scss">
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
    color: $main-color;
  }
}
</style>
