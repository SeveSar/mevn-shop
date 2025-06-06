<script lang="ts">
import { useMenu } from '@/composables/menu';
import { useCartStore } from '@/modules/cart';
import { useUserStore } from '@/modules/user/stores/user';

import { RouteNamesEnum } from '@/router/router.types';
import { BaseIcon } from 'pizza-mevn-ui-kit';
import { defineComponent } from 'vue';
import UserMenuSettings from './UserMenuSettings.vue';

export default defineComponent({
  components: {
    BaseIcon,
    UserMenuSettings,
  },
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();

    const { isOpenedBurger, menuLinks } = useMenu();

    return {
      menuLinks,
      userStore,
      cartStore,
      isOpenedBurger,
      RouteNamesEnum,
    };
  },
});
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__top">
        <div class="container">
          <div class="header__top-inner">
            <div class="header__top-col">
              <div class="header__text">Время работы: с 11:00 до 23:00</div>
            </div>
            <div class="header__top-col">
              <UserMenuSettings />
            </div>
          </div>
        </div>
      </div>
      <div class="header__bottom">
        <div class="container">
          <div class="header__bottom-inner">
            <div class="header__bottom-logo">
              <router-link :to="{ name: RouteNamesEnum.products }" href="#" class="logo">
                <img src="@/assets/images/logo.svg" alt="" />
              </router-link>
            </div>
            <nav v-if="userStore.isLoggedIn" class="nav">
              <ul class="nav-list">
                <li v-for="link in menuLinks" :key="link.title" class="nav-list__item">
                  <router-link to="/" :class="{ active: link.active }">
                    {{ link.title }}
                  </router-link>
                </li>
              </ul>
            </nav>
            <div class="header__bottom-user">
              <button class="user-cart" @click="cartStore.isSidePanelCart = true">
                <BaseIcon name="IconBasket" />
                <div class="user-cart__price">{{ cartStore.totalPrice }} ₽</div>
              </button>
              <div class="burger" :class="{ active: isOpenedBurger }" @click="isOpenedBurger = !isOpenedBurger">
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import './burger';

.header {
  width: 100%;
  z-index: 999;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: $breakpoint-lg) {
    width: 100%;
  }

  &__top {
    border-bottom: 1px solid #f0f0f0;
    padding: 4px 0;
    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-col {
      display: flex;
      align-items: center;
      @media screen and (max-width: $breakpoint-sm) {
        &:last-child {
          display: none;
        }
      }
    }
  }

  .logo {
    display: block;
    width: 141px;
    @media screen and (max-width: $breakpoint-lg) {
      width: 120px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }

  &__bottom {
    padding: 12px 0;
    @media screen and (max-width: $breakpoint-lg) {
      padding: 7px 0;
    }
    &-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .user-cart {
    background: #ff7010;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 17px;
    color: #ffffff;
    @media screen and (max-width: $breakpoint-lg) {
      display: none;
    }
    svg {
      margin-right: 8px;
    }
  }
  .nav {
    @media screen and (max-width: $breakpoint-lg) {
      display: none;
    }
  }
}
.nav-list {
  display: flex;
  @media screen and (max-width: $breakpoint-lg) {
    flex-direction: column;
  }
  &__item {
    font-size: 16px;
    line-height: 22px;
    &:not(:last-child) {
      margin-right: 32px;
      @media screen and (max-width: $breakpoint-lg) {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }
    a {
      color: #191919;
      &.active {
        color: #ff7010;
      }
      &:hover {
        color: #ff7010;
      }
    }
  }
}
</style>
