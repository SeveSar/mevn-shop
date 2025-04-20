<script setup lang="ts">
import { useMenu } from '@/composables/menu';
import { useAuthModalStore } from '@/modules/user';
import { useUserStore } from '@/modules/user/stores/user';

import { BaseButton, BaseIcon } from 'pizza-mevn-ui-kit';

const { logOut, isOpenedBurger, menuLinks } = useMenu();
const modalStore = useAuthModalStore();

const userStore = useUserStore();
</script>

<template>
  <div class="mobile-menu" :class="{ active: isOpenedBurger }">
    <div class="user-auth">
      <BaseButton v-if="!userStore.isLoggedIn" variant="text" class="user-auth__btn" @click="modalStore.openAuthModal">
        <BaseIcon name="IconUser" />
        Войти в аккаунт
      </BaseButton>
      <div v-if="userStore.isLoggedIn" class="user-drop">
        <div class="current">
          <BaseButton variant="text">
            <BaseIcon name="IconUser" />
            {{ userStore.user?.email }}
          </BaseButton>
        </div>
      </div>
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
    <div class="mobile-menu__footer">
      <BaseButton class="mobile-menu__logout" variant="text" @click="logOut"> Выйти </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  top: 0;
  overflow: auto;
  z-index: 777;
  height: 100%;
  background-color: #fff;
  width: 100%;
  padding: 100px 20px 20px;
  transition: all 0.2s ease-in-out;
  transform: translateY(-100%);
  display: flex;
  flex-direction: column;

  &.active {
    transform: translateY(0);
  }
  .nav {
    margin-top: 25px;
  }
  .button {
    svg {
      margin-right: 6px;
    }
  }

  &__footer {
    margin-top: auto;
    padding-top: 25px;
  }

  .user-auth__btn {
    color: #ff7010;
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
}
</style>
