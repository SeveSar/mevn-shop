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
              <div class="user-auth">
                <button v-if="!userStore.isLoggedIn" class="user-auth__btn" @click="modalStore.openAuthModal">
                  <AppIcon name="IconUser"></AppIcon>
                  Войти в аккаунт
                </button>
                <div v-if="userStore.isLoggedIn" class="user-drop">
                  <div class="current">
                    <BaseButton variant="text">
                      <AppIcon name="IconUser"></AppIcon>
                      Вы
                    </BaseButton>
                  </div>
                  <div class="dropdown">
                    <div class="dropdown__inner">
                      <BaseButton @click="logOut">Выйти</BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header__bottom">
        <div class="container">
          <div class="header__bottom-inner">
            <div class="header__bottom-logo">
              <router-link :to="{ name: 'Home' }" href="#" class="logo">
                <img src="@/assets/images/logo.svg" alt="" />
              </router-link>
            </div>
            <nav class="nav" v-if="userStore.isLoggedIn">
              <ul class="nav-list">
                <li class="nav-list__item" v-for="link in menuLinks" :key="link.title">
                  <router-link to="/" :class="{ active: link.active }">
                    {{ link.title }}
                  </router-link>
                </li>
              </ul>
            </nav>
            <div class="header__bottom-user">
              <button class="user-cart" @click="cartStore.isSidePanelCart = true">
                <AppIcon name="IconBasket"></AppIcon>
                <div class="user-cart__price">{{ cartStore.totalPrice }} ₽</div>
              </button>
              <div class="burger" @click="isOpenedBurger = !isOpenedBurger" :class="{ active: isOpenedBurger }">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/modules/user/stores/user';

import AppIcon from '@/components/ui/AppIcon/AppIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { ref, watch, defineComponent } from 'vue';
import { useCartStore } from '@/modules/cart/stores/cart';
import { useMenu } from '@/composables/menu';

export default defineComponent({
  components: {
    AppIcon,
    BaseButton,
  },
  setup() {
    const modalStore = useModalStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();

    const { logOut, isOpenedBurger, menuLinks } = useMenu();

    return {
      logOut,
      menuLinks,
      modalStore,
      userStore,
      cartStore,
      isOpenedBurger,
    };
  },
});
</script>

<style scoped lang="less">
.user-drop {
  position: relative;

  button {
    display: flex;
    align-items: center;
    transition: all 0.2s linear;
    font-size: 14px;
    line-height: 18px;
    color: #ff7010;
  }

  &:hover {
    color: darken(#ff7010, 15%);
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
  .dropdown {
    position: absolute;
    top: 100%;
    z-index: 5;
    width: 150px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s linear;
    padding-top: 10px;
    opacity: 0;
    visibility: hidden;
    @media screen and (max-width: 1430px) {
      left: auto;
      transform: none;
      right: 0;
    }

    &__inner {
      padding: 15px 20px;
      background: #ffffff;
      /* Line gray */
      border: 1px solid #f0f0f0;
      box-shadow: 0px 2px 8px rgba(25, 25, 25, 0.1);
      border-radius: 12px;
    }
    .button {
      margin: 0;
    }
  }
}
.header {
  width: 100%;
  position: relative;
  z-index: 999;
  background-color: #fff;
  @media screen and (max-width: 991px) {
    position: fixed;
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
      @media screen and (max-width: 575px) {
        &:last-child {
          display: none;
        }
      }
    }
  }
  .user-auth {
    margin-left: 40px;
    &__btn {
      color: #ff7010;
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 10px;
    }
  }

  .logo {
    display: block;
    width: 141px;
    @media screen and (max-width: 991px) {
      width: 120px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .header__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
  &__bottom {
    padding: 12px 0;
    @media screen and (max-width: 991px) {
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
    @media screen and (max-width: 991px) {
      display: none;
    }
    svg {
      margin-right: 8px;
    }
  }
  .nav {
    @media screen and (max-width: 991px) {
      display: none;
    }
  }
}
.nav-list {
  display: flex;
  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
  &__item {
    font-size: 16px;
    line-height: 22px;
    &:not(:last-child) {
      margin-right: 32px;
      @media screen and (max-width: 991px) {
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
