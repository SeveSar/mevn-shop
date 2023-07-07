<template>
  <section class="profile">
    <div class="profile__header">
      <h1 class="page-title">Мой аккаунт</h1>
      <div class="profile__tabs">
        <router-link class="btn profile__tabs-tab" :to="{ name: RouteNamesEnum.settings }">Настройки</router-link>
        <router-link class="btn profile__tabs-tab" :to="{ name: RouteNamesEnum.orders }">История заказов</router-link>
      </div>
    </div>
    <router-view />
  </section>
</template>

<script setup lang="ts">
import { RouteNamesEnum } from '@/router/router.types';
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<style scoped lang="less">
.profile {
  padding-top: 40px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__tabs {
    display: flex;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    background: #ffffff;
    max-width: 360px;
    width: 100%;
    &-tab {
      width: 50%;
      border-radius: 6px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #191919;
      padding: 13px 20px;
      &.exact-active {
        background-color: #ff7010;
        color: #fff;
      }
    }
  }
}
</style>
