<template>
  <form class="order-form" @submit.prevent="onOrder">
    <div class="order-form__block">
      <div class="order-form__block-header">
        <h3 class="order-form__block-title">О вас</h3>
      </div>
      <div class="order-form__row">
        <BaseInput v-model="orderInfo.name" :required="true" label-text="Имя" />
        <BaseInput v-model="orderInfo.phone" :required="true" label-text="Номер телефона" />
        <BaseInput v-model="orderInfo.email" label-text="Почта" />
      </div>
    </div>
    <div class="order-form__block">
      <div class="order-form__block-header">
        <h3 class="order-form__block-title">Доставка</h3>
        <div class="order-form__tabs">
          <BaseTab class="order-form__tab" :items="deliveryTabs" v-model="orderInfo.typeDelivery" />
        </div>
      </div>
      <div class="order-form__content">
        <component
          :is="TYPE_DELIVERIES_MAP[orderInfo.typeDelivery.id]"
          v-model="orderInfo.delivery[orderInfo.typeDelivery.id.toLocaleLowerCase()]"
        />
      </div>
      <div class="order-form__make">
        <span class="order-form__caption">Когда выполнить заказ?</span>
        <div class="order-form__row order-form__make-controls">
          <BaseRadio
            v-for="radio in orderTypeTimingTabs"
            v-model="orderInfo.typeTiming"
            :key="radio.value"
            :value="radio.value"
            :label="radio.label"
            name="order-time"
          />
          <div class="order-form__time-date" v-if="orderInfo.typeTiming === 'DATE'">
            <BaseDatePicker v-model="orderInfo.timingDate" mode="dateTime" is24hr />
          </div>
        </div>
      </div>
    </div>
    <div class="order-form__block">
      <div class="order-form__block-header">
        <h3 class="order-form__block-title">Оплата</h3>
      </div>
      <div class="order-form__row">
        <BaseRadio
          v-for="radio in paymanetVariants"
          v-model="orderInfo.payment"
          :key="radio.value"
          :value="radio.value"
          :label="radio.label"
          name="payment"
        />
      </div>
    </div>
    <div class="order-form__block">
      <div class="order-form__block-header">
        <h3 class="order-form__block-title">Комментарий</h3>
      </div>
      <BaseTextArea v-model="orderInfo.comment" placeholder="Есть уточнения?"></BaseTextArea>
    </div>
    <div class="order-form__footer">
      <div class="order-form__values">
        <div class="cart__footer-cnt"><span>Всего в корзине: </span> {{ totalItems }} шт</div>
        <div class="cart__footer-price"><span>Итого: </span>{{ totalPrice }} ₽</div>
      </div>
      <BaseButton type="submit" class="button_order" :is-loading="isLoadingOrder"> Оформить заказ </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseRadio from '@/components/ui/BaseRadio.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTab from '@/components/ui/BaseTab.vue';
import TypeOrderDelivery from './typeOrders/TypeOrderDelivery.vue';
import TypeOrderPickup from './typeOrders/TypeOrderPickup.vue';
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue';
import BaseTextArea from '@/components/ui/BaseTextArea.vue';
import { reactive, type Component, ref, watch } from 'vue';
import { useUserStore } from '@/modules/user/stores/user';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../stores/cart';
import { api } from '@/api/api';
import router from '@/router';
import { RouteNamesEnum } from '@/router/router.types';
import { toaster } from '@/main';
import { clearAll } from '@/utils/localstorage';

interface ITypeOrder {
  title: string;
  id: 'ADDRESS' | 'RESTAURANT';
}
type TTypeTiming = 'URGENT' | 'DATE';
type TTypePayment = 'CASH' | 'CARD' | 'APPLE';

const cartStore = useCartStore();
const modalStore = useModalStore();
const userStore = useUserStore();

const { totalItems, totalPrice } = storeToRefs(cartStore);

const TYPE_DELIVERIES_MAP: Record<ITypeOrder['id'], Component> = {
  ADDRESS: TypeOrderDelivery,
  RESTAURANT: TypeOrderPickup,
} as const;

const isLoadingOrder = ref(false);
const orderTypeTimingTabs = ref<{ label: string; value: TTypeTiming }[]>([
  { label: 'Как можно скорее', value: 'URGENT' },
  { label: 'По вемени', value: 'DATE' },
]);

const paymanetVariants = ref<{ label: string; value: TTypePayment }[]>([
  { label: 'Наличными', value: 'CASH' },
  { label: 'Картой', value: 'CARD' },
  { label: 'Apple Pay', value: 'APPLE' },
]);

const deliveryTabs: ITypeOrder[] = [
  { title: 'Доставка', id: 'ADDRESS' },
  { title: 'Самовывоз', id: 'RESTAURANT' },
];

const orderInfo = reactive({
  name: '',
  phone: '',
  email: '',
  typeDelivery: { title: 'Доставка', id: 'ADDRESS' } as ITypeOrder,
  delivery: {
    address: {
      street: '',
      house: '',
      porch: '',
      floor: '',
      flat: '',
      door_phone: '',
    },
    restaurant: '',
  },
  typeTiming: orderTypeTimingTabs.value[0].value as TTypeTiming,
  timingDate: null,
  payment: paymanetVariants.value[0].value,
  comment: '',
});

watch(
  () => orderInfo.typeTiming,
  (val) => {
    if (val === 'URGENT') {
      orderInfo.timingDate = null;
    }
  }
);

const onOrder = async () => {
  isLoadingOrder.value = true;
  const { name, phone, email, typeDelivery, payment, comment, delivery, typeTiming, timingDate } = orderInfo;
  const currentOrderInfo: {
    name: string;
    phone: string;
    email: string;
    typeDelivery: string;
    comment: string;
    payment: string;
    typeTiming: TTypeTiming;
    timingDate: string | null;
    address?: {
      street: string;
      house: string;
      porch: string;
      floor: string;
      flat: string;
      door_phone: string;
    };
    restaurant?: string;
  } = {
    name,
    phone,
    email: email ? email : null,
    typeDelivery: typeDelivery.id,
    comment: comment ? comment : null,
    payment,
    timingDate: timingDate ? timingDate.toUTCString() : null,
    typeTiming,
  };

  if (typeDelivery.id === 'ADDRESS') {
    currentOrderInfo.address = delivery.address;
  } else {
    currentOrderInfo.restaurant = delivery.restaurant;
  }

  try {
    await api.order.createOrder(currentOrderInfo);
    router.push({ name: RouteNamesEnum.orders });
    toaster.showToast({ text: 'Заказ успешно оформлен', type: 'info' });
    cartStore.clearCart();
  } catch (e) {
    console.error(e);
    toaster.showToast({ text: 'Ошибка', type: 'error' });
  } finally {
    isLoadingOrder.value = false;
  }
};
</script>

<style scoped lang="less">
.order-form {
  margin-top: 30px;
  &__block {
    border-bottom: 1px solid @gray-color;
    padding-bottom: 20px;
    margin-bottom: 20px;
    &-header {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-title {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.3;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__make {
    margin-top: 16px;

    &-controls {
      margin-top: 8px;
    }
  }

  &__flex {
    display: flex;
    align-items: center;
  }

  &__caption {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: @gray2-color;
  }

  &__tab {
    &:deep(.base-tab__tab) {
      min-width: 170px;
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
}
</style>
