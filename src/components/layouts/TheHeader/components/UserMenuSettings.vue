<template>
  <div class="user-menu-settings">
    <button v-if="!userStore.isLoggedIn" class="user-menu-settings__login" @click="modalStore.openAuthModal">
      <BaseIcon class="user-menu-settings__login-icon" name="IconUser" />
      Войти в аккаунт
    </button>
    <div v-else class="user-menu-settings__logged">
      <div class="user-menu-settings__logged-current">
        <BaseIcon class="user-menu-settings__logged-icon" name="IconUser" />
        {{ userStore.user?.email }}
      </div>
      <div class="user-menu-settings__dropdown">
        <BaseCardShadow class="user-menu-settings__dropdown-inner">
          <div class="user-menu-settings__dropdown-links">
            <router-link class="user-menu-settings__dropdown-link" :to="{ name: RouteNamesEnum.orders }">
              История заказов
            </router-link>
            <router-link class="user-menu-settings__dropdown-link" :to="{ name: RouteNamesEnum.settings }">
              Настройки
            </router-link>
          </div>
          <div class="user-menu-settings__dropdown-footer">
            <BaseButton variant="text" @click="logOut">Выход из аккаунта</BaseButton>
          </div>
        </BaseCardShadow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/modules/user/stores/user';
import { RouteNamesEnum } from '@/router/router.types';
import { useModalStore } from '@/stores/modal';
import { useMenu } from '@/composables/menu';
import BaseIcon from '@/components/ui/BaseIcon/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCardShadow from '@/components/ui/BaseCardShadow.vue';

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
    display: flex;
    flex-direction: column;
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
      padding: 16px 0 16px 0;
    }

    &-links {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 0 20px;
    }

    &-link {
      transition: all 0.2s linear;
      color: @black-color;
      &:hover {
        color: @main-color;
      }
      & + & {
        margin-top: 16px;
      }
    }

    &-footer {
      border-top: 1px solid @gray-color;
      padding: 16px 20px 0;
      margin-top: 16px;
    }

    .button {
      margin: 0;
    }
  }
}
</style>
