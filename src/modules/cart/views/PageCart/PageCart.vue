<template>
  <div class="cart">
    <div class="cart__inner" v-if="cart.length">
      <div class="cart__header">
        <h1 class="page-title">Ваш заказ</h1>
      </div>
      <CartItem v-for="item in cartStore.cart" :key="item.id" :item="item" />
      <div class="cart__footer">
        <div class="cart__footer-cnt"><span>Всего в корзине: </span> {{ totalItems }} шт</div>
        <div class="cart__footer-price"><span>Итого: </span>{{ totalPrice }} ₽</div>
      </div>
      <BaseButton class="button_order" @click="order"> Оформить заказ </BaseButton>
    </div>
    <div class="cart-empty" v-show="!cart.length">
      <img src="@/assets/images/empty-cart.png" alt="" />
      <router-link :to="{ name: RouteNamesEnum.products }">Вернуться к покупкам</router-link>
    </div>
    <OrderForm />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';
import CartItem from '@/components/widgets/cart/CartItem.vue';
import OrderForm from '../../components/OrderForm/OrderForm.vue';
import { RouteNamesEnum } from '@/router/router.types';
const cartStore = useCartStore();
const { cart, totalPrice, totalItems } = storeToRefs(cartStore);
const router = useRouter();

const order = () => {
  router.push({ name: 'Order' });
};
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
  .button_clear {
    color: #000;
    @media screen and (max-width: 575px) {
      margin-top: 15px;
    }
    svg {
      transition: all 0.2s linear;
    }
    &:hover {
      color: #ff7010;
      svg {
        fill: #ff7010;
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
