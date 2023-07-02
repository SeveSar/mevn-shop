<template>
  <TheHeader />
  <MobileMenu />
  <main class="main">
    <div class="container">
      <slot></slot>
    </div>
  </main>

  <Teleport to="body">
    <button class="cart-button" @click="cartStore.isSidePanelCart = true">
      <img class="cart-button__img" src="@/assets/images/icons/cart.svg" alt="" />
      <span class="cart-button__text">{{ cartStore.totalItems }}</span>
    </button>
  </Teleport>
</template>

<script lang="ts">
import TheHeader from '@/components/layouts/TheHeader.vue';
import MobileMenu from '@/components/layouts/components/MobileMenu.vue';
import { useRouter, useRoute } from 'vue-router';

import { watch, defineComponent, onMounted } from 'vue';
import { useCartStore } from '@/modules/cart/stores/cart';
export default defineComponent({
  components: {
    TheHeader,
    MobileMenu,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartStore();

    const checkRouteErrors = () => {
      if (route.query.msg) {
        switch (route.query.msg) {
          case 'NOT_AUTH':
            break;
        }
        router.push({ query: {} });
      }
    };
    onMounted(() => {
      checkRouteErrors();
    });
    watch(
      () => route.query,
      () => {
        checkRouteErrors();
      }
    );
    return {
      cartStore,
    };
  },
});
</script>
<style scoped lang="less">
.cart-button {
  position: fixed;
  background: #ff7010;
  box-shadow: 0px 2px 8px rgba(25, 25, 25, 0.2);
  border-radius: 50%;
  display: flex;
  width: 56px;
  height: 56px;
  right: 20px;
  z-index: 444;
  bottom: 20px;
  &__img {
    margin: auto;
    display: block;
  }
  &__text {
    position: absolute;
    top: -2px;
    right: -2px;
    background: #ffffff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ff7010;
    border-radius: 50%;
    font-weight: 400;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    color: #ff7010;
  }
}
</style>
