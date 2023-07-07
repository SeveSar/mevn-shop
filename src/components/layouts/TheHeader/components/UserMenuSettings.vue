<template>
  <div class="user-menu-settings">
    <button v-if="!userStore.isLoggedIn" class="user-menu-settings__login" @click="modalStore.openAuthModal">
      <AppIcon class="user-menu-settings__login-icon" name="IconUser" />
      Войти в аккаунт
    </button>
    <div v-else class="user-menu-settings__logged">
      <div class="user-menu-settings__logged-current">
        <AppIcon class="user-menu-settings__logged-icon" name="IconUser" />
        {{ userStore.user?.email }}
      </div>
      <div class="user-menu-settings__dropdown">
        <div class="user-menu-settings__dropdown-inner">
          <div class="user-menu-settings__dropdown-links">
            <router-link :to="{ name: RouteNamesEnum.orders }"> История заказов </router-link>
            <router-link :to="{ name: RouteNamesEnum.settings }"> Настройки </router-link>
          </div>
          <div class="user-menu-settings__dropdown-footer">
            <BaseButton variant="text" @click="logOut">Выход из аккаунта</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/modules/user/stores/user';
import { RouteNamesEnum } from '@/router/router.types';
import { useModalStore } from '@/stores/modal';
import { useMenu } from '@/composables/menu';
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const userStore = useUserStore();
const modalStore = useModalStore();
const { logOut } = useMenu();
</script>

<style scoped lang="less">
.user-menu-settings {
  &__login {
    display: flex;
    align-items: center;
    transition: all 0.2s linear;
    font-size: 14px;
    line-height: 18px;
    color: @black-color;

    &:hover {
      color: @main-color;
    }

    &-icon {
      margin-right: 8px;
      color: @main-color;
    }
  }

  &__logged {
    position: relative;
    color: @main-color;
    cursor: pointer;
    &-current {
      display: flex;
      align-items: center;
    }

    &-icon {
      margin-right: 8px;
    }

    &:hover {
      color: darken(#ff7010, 15%);
      .user-menu-settings__dropdown {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    z-index: 5;
    width: 150px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s linear;
    padding-top: 10px;
    opacity: 0;
    right: 0;
    visibility: hidden;
    min-width: 285px;
    @media screen and (max-width: 1430px) {
      left: auto;
      transform: none;
      right: 0;
    }

    &-inner {
      padding: 15px 20px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      box-shadow: 0px 2px 8px rgba(25, 25, 25, 0.1);
      border-radius: 12px;
    }

    &-links {
      display: flex;
      flex-direction: column;
    }

    .button {
      margin: 0;
    }
  }
}
</style>
