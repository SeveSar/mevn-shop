<template>
  <section class="profile">
    <div class="profile__header">
      <h1 class="profile__title">Мой аккаунт</h1>
      <div class="profile__tabs">
        <router-link class="btn profile__tabs-tab" :to="{ name: RouteNamesEnum.settings }">Настройки</router-link>
        <router-link class="btn profile__tabs-tab" :to="{ name: RouteNamesEnum.orders }">История заказов</router-link>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { RouteNamesEnum } from '@/router/router.types';
</script>

<style scoped lang="less">
.profile {
  padding-top: 40px;
  max-width: 850px;
  width: 100%;
  margin: 0 auto;

  &__title {
    color: @black-color;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
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
