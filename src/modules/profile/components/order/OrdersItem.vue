<template>
  <BaseAccordionList :is-close-others="false">
    <div class="orders-item">
      <BaseAccordionListItem>
        <template #trigger="{ isVisible }">
          <div class="orders-item__header orders-item-header" :class="{ 'orders-item-header--active': isVisible }">
            <IconArrowDown class="orders-item-header__icon" />
            <div class="orders-item-header__top">
              <div class="orders-item-header__col">
                <span class="orders-item-header__caption">Заказ</span>
                <div class="orders-item-header__flex">
                  <div class="orders-item-header__text">№{{ item.number }}</div>
                </div>
              </div>
              <div class="orders-item-header__col">
                <span class="orders-item-header__caption">Сумма заказа</span>
                <div class="orders-item-header__text">{{ getTotalPriceOrder(item.products) }} ₽</div>
              </div>
              <div class="orders-item-header__col">
                <span class="orders-item-header__caption">Статус</span>
                <div class="orders-item-header__text">{{ item.getStatusTitle() }}</div>
              </div>
              <div class="orders-item-header__col">
                <span class="orders-item-header__caption">Оплачено</span>
                <div class="orders-item-header__text">{{ item.getPaymentTitle() }}</div>
              </div>
            </div>
            <div class="orders-item-header__bottom">
              <div class="orders-item-header__address orders-item-header__text">
                {{ currentAddress }}
              </div>
              <div class="orders-item-header__pizzas">
                <img class="orders-item-header__pizzas-icon" src="@/assets/images/small-pizza.png"
                  v-for="i in pizzaImages" alt="" :key="i" />
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <div class="orders-item-body">
            <div class="orders-item-body__products">
              <OrdersItemProduct v-for="pr in item.products" :key="pr.id" :product="pr" />
            </div>
          </div>
        </template>
      </BaseAccordionListItem>
    </div>
  </BaseAccordionList>
</template>

<script setup lang="ts">
import IconArrowDown from '@/components/ui/icons/IconArrowDown.vue';
import BaseAccordionList from '@/components/ui/accordion/BaseAccordionList.vue';
import BaseAccordionListItem from '@/components/ui/accordion/BaseAccordionListItem.vue';
import OrdersItemProduct from './OrdersItemProduct.vue';

import { computed, ref } from 'vue';
import { OrderDTO, OrderProductDTO } from '@/models/order.dto';
interface Props {
  item: OrderDTO;
}
const props = defineProps<Props>();

const currentAddress = computed(() => {
  const { street, house, porch, floor, door_phone: doorPhone } = props.item?.address || {};
  const addressParts = [];
  if (street) addressParts.push(`Ул. ${street}`);
  if (house) addressParts.push(`${house},`);
  if (porch) addressParts.push(`подъезд ${porch},`);
  if (floor) addressParts.push(`${floor} этаж,`);
  if (doorPhone) addressParts.push(`домофон ${doorPhone}#`);

  const total = addressParts.length > 0 ? addressParts.join(' ') : 'Адрес не указан';
  return total;
});

const getTotalPriceOrder = (products: OrderProductDTO[]) => {
  return products.reduce((acc, pr) => acc + pr.totalPrice, 0);
};

const pizzaImages = computed(() => {
  return props.item.products.length >= 3 ? 3 : props.item.products.length;
});
</script>

<style scoped lang="less">
.orders-item {
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid @gray-color;
  background: @white-color;
  margin-bottom: 50px;

  &-header {
    position: relative;
    cursor: pointer;

    &--active {
      .orders-item-header__icon {
        transform: rotate(180deg);
      }
    }

    &__icon {
      position: absolute;
      right: 0;
      top: 15px;
      color: @main-color;
      transition: transform 0.2s ease-in-out;
    }

    &__top {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      column-gap: 15px;
      row-gap: 12px;
      border-bottom: 1px solid @gray-color;
      justify-content: space-between;
      padding-bottom: 16px;
      padding-right: calc(16px + 85px);
    }

    &__bottom {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__caption {
      color: @gray2-color;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      display: inline-block;
      margin-bottom: 4px;
    }

    &__text {
      color: @black-color;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }

    &__pizzas {
      &-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}
</style>
