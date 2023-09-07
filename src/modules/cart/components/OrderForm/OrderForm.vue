<template>
  <form class="order-form" @submit.prevent="onOrder">
    <div class="order-form__block">
      <div class="order-form__block-header">
        <h3 class="order-form__block-title">О вас</h3>
      </div>
      <div class="order-form__row">
        <BaseInput
          v-model="orderInfo.name"
          :required="true"
          label-text="Имя"
          :errors="
          v$.name.$error ? v$.name.$errors[0].$message as string : null 
        "
        />
        <BaseInput
          v-model="orderInfo.phone"
          :required="true"
          :errors="v$.phone.$error ? v$.phone.$errors[0].$message as string : null "
          label-text="Номер телефона"
          mask="phone"
          ref="phoneRef"
        />

        <BaseInput
          v-model="orderInfo.email"
          label-text="Почта"
          :errors="
          v$.email.$error ? v$.email.$errors[0].$message as string : null 
        "
        />
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
            <BaseDatePicker
              :errors="v$.timingDate.$error ? v$.timingDate.$errors[0].$message as string : null"
              v-model="orderInfo.timingDate"
              mask="date"
              mode="dateTime"
              is24hr
            />
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
import { reactive, type Component, ref, watch, onMounted, computed, provide } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '../../stores/cart';
import { api } from '@/api/api';
import router from '@/router';
import { RouteNamesEnum } from '@/router/router.types';
import { toaster } from '@/main';
import type { IOrderCreate } from '@/types/IOrder';
import type { TOrderTypeDelivery, TOrderTypeTiming, TOrderPayment } from '@/constants';
import { getValidationRule } from '@/utils/validations';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

interface ITypeOrder {
  title: string;
  id: TOrderTypeDelivery;
}

const cartStore = useCartStore();

const { totalItems, totalPrice } = storeToRefs(cartStore);

const TYPE_DELIVERIES_MAP: Record<ITypeOrder['id'], Component> = {
  ADDRESS: TypeOrderDelivery,
  RESTAURANT: TypeOrderPickup,
} as const;

const isLoadingOrder = ref(false);
const orderTypeTimingTabs = ref<{ label: string; value: TOrderTypeTiming }[]>([
  { label: 'Как можно скорее', value: 'URGENT' },
  { label: 'По вемени', value: 'DATE' },
]);

const paymanetVariants = ref<{ label: string; value: TOrderPayment }[]>([
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
      house: null,
      porch: null,
      floor: null,
      flat: null,
      door_phone: null,
    },
    restaurant: '',
  },
  typeTiming: orderTypeTimingTabs.value[0].value as TOrderTypeTiming,
  timingDate: null,
  payment: paymanetVariants.value[0].value,
  comment: '',
});

const rules = computed(() => {
  const localeRules: any = {
    email: getValidationRule('optionalEmail'),
    name: getValidationRule('requiredMinlength'),
    phone: getValidationRule('phone'),
  };

  if (orderInfo.typeTiming === 'DATE') {
    localeRules.timingDate = {
      required: helpers.withMessage('Поле не должно быть пустым', required),
    };
  }

  if (orderInfo.typeDelivery.id === 'ADDRESS') {
    localeRules.delivery = {
      address: {
        street: {
          required: helpers.withMessage('Поле не должно быть пустым', required),
          minLength: helpers.withMessage('Не менее 2 символов', minLength(2)),
        },
      },
    };
  } else {
    localeRules.delivery = {
      restaurant: {
        required: helpers.withMessage('Поле не должно быть пустым', required),
        minLength: helpers.withMessage('Не менее 2 символов', minLength(2)),
      },
    };
  }

  return localeRules;
});

const v$ = useVuelidate(rules, orderInfo);

const phoneRef = ref<InstanceType<typeof BaseInput> | null>(null);

const onOrder = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) return;
  isLoadingOrder.value = true;
  const { name, email, typeDelivery, payment, comment, delivery, typeTiming, timingDate } = orderInfo;
  const currentOrderInfo: IOrderCreate = {
    name,
    phone: phoneRef.value.getUnMaskedValue(),
    email: email ? email : null,
    typeDelivery: typeDelivery.id,
    comment: comment ? comment : null,
    payment,
    timingDate: timingDate ? timingDate.toISOString() : null,
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
    v$.value.$reset();
    isLoadingOrder.value = false;
  }
};

watch(
  () => orderInfo.typeTiming,
  (val) => {
    if (val === 'URGENT') {
      orderInfo.timingDate = null;
    }
  }
);

provide('v$', v$);
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
