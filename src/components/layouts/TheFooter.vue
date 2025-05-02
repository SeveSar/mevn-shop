<script setup lang="ts">
import { RouteNamesEnum } from '@/router/router.types';
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__row">
        <div class="footer__col">
          <div class="header__bottom-logo">
            <router-link :to="{ name: RouteNamesEnum.products }" href="#" class="logo">
              <img src="@/assets/images/logo.svg" alt="" />
            </router-link>
          </div>
          <span class="footer__copy"> © Copyright 2021 — Куда Пицца </span>
        </div>
        <div class="footer__col">
          <strong class="footer__subtitle"> Куда пицца </strong>
          <ul class="footer__menu">
            <li class="footer__menu-item">О компании</li>
            <li class="footer__menu-item">Пользовательское соглашение</li>
            <li class="footer__menu-item">Условия гарантии</li>
          </ul>
        </div>
        <div class="footer__col">
          <strong class="footer__subtitle"> Помощь </strong>
          <ul class="footer__menu">
            <li class="footer__menu-item">Ресторан</li>
            <li class="footer__menu-item">Контакты</li>
            <li class="footer__menu-item">Поддержка</li>
            <li class="footer__menu-item">Отследить заказ</li>
          </ul>
        </div>
        <div class="footer__col">
          <strong class="footer__subtitle"> Контакты </strong>
          <ul class="footer__menu">
            <li class="footer__menu-item">+7 (926) 223-10-11</li>
            <li class="footer__menu-item">Москва, ул. Юных Ленинцев, д.99</li>
            <li class="footer__menu-item">
              <div>Facebok</div>
              <div>Instagram</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid $gray-color;
  padding: 32px 0;
  font-size: 16px;

  &__row {
    display: grid;
    grid-template-columns: repeat(4, auto);
    column-gap: 125px;

    @media screen and (max-width: $breakpoint-xl) {
      column-gap: 50px;
    }
    @media screen and (max-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, auto);
      row-gap: 50px;
    }
    @media screen and (max-width: $breakpoint-sm) {
      grid-template-columns: auto;
      row-gap: 24px;
    }
  }
  &__col {
    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media screen and (max-width: $breakpoint-sm) {
        .footer__copy {
          display: none;
        }
      }
    }
  }
  &__subtitle {
    font-size: 20px;
    display: block;
    margin-bottom: 22px;
  }
  &__menu {
    &-item {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
