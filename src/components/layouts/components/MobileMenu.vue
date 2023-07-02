<template>
  <div class="mobile-menu" :class="{ active: isOpenedBurger }">
    <div class="user-auth">
      <BaseButton v-if="!userStore.isLoggedIn" class="user-auth__btn" @click="modalStore.openAuthModal">
        <AppIcon name="IconUser"></AppIcon>
        Войти в аккаунт
      </BaseButton>
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
    <nav class="nav" v-if="userStore.isLoggedIn">
      <ul class="nav-list">
        <li class="nav-list__item" v-for="link in menuLinks" :key="link.title">
          <router-link to="/" :class="{ active: link.active }">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/modules/user/stores/user';
import { useMenu } from '@/composables/menu';
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

const { logOut, isOpenedBurger, menuLinks } = useMenu();
const modalStore = useModalStore();

const userStore = useUserStore();
</script>

<style scoped lang="less">
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
  .dropdown {
    @media screen and (max-width: 991px) {
      left: 0;
      right: auto;
    }
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
