<template>
  <div class="cart">
    <div class="cart__inner" v-show="cart.length">
      <div class="cart__header">
        <h1 class="page-title">Ваш заказ</h1>
      </div>
      <CartItem v-for="item in cart" :key="item.id" :item="item" />
    </div>
    <div class="cart-empty" v-show="!cart.length">
      <img src="@/assets/images/empty-cart.png" alt="" />
      <router-link :to="{ name: RouteNamesEnum.products }">Вернуться к покупкам</router-link>
    </div>
    <OrderForm v-if="cart.length" />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import CartItem from '@/components/widgets/cart/CartItem.vue';
import OrderForm from '../../components/OrderForm/OrderForm.vue';
import { RouteNamesEnum } from '@/router/router.types';
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const router = useRouter();
</script>

<style scoped lang="less">
.cart {
  max-width: 882px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  padding: 80px 0;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    @media screen and (max-width: 575px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &-empty {
    display: flex;
    flex-direction: column;
    img {
      display: block;
      margin: auto;
      width: 60%;
      @media screen and (max-width: 575px) {
        width: 100%;
      }
    }
    a {
      font-weight: 400;
      font-size: 25px;
      line-height: 39px;
      margin: 20px auto 0;
      display: inline-block;
      color: #ff7010;
      transition: all 0.2s linear;
      &:hover {
        color: darken(#ff7010, 15%);
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-weight: 600;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    font-size: 20px;
    line-height: 28px;
    color: #ff7010;
    padding: 20px 16px;

    @media screen and (max-width: 575px) {
      flex-direction: column;
      align-items: flex-start;
      .cart__footer-price {
        margin-top: 15px;
      }
    }
    span {
      color: #000;
    }
  }
  .button_order {
    margin: 25px auto 0;
  }
}
</style>
