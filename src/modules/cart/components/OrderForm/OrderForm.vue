<template>
  <form class="order-form">
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
          <BaseTab class="order-form__tab" :items="deliveryTabs" v-model="typeOrder" />
        </div>
      </div>
      <div class="order-form__content">
        <component :is="TYPE_DELIVERIES_MAP[typeOrder.id]" v-model="orderInfo[typeOrder.id]"></component>
      </div>
      <div class="order-form__make">
        <span class="order-form__caption">Когда выполнить заказ?</span>
        <div class="order-form__row order-form__make-controls">
          <BaseRadio
            v-for="radio in orderMakeTypes"
            v-model="orderInfo.orderMakeType"
            :key="radio.value"
            :value="radio.value"
            :label="radio.label"
            name="order-time"
          />
          <div class="order-form__time-date" v-if="orderInfo.orderMakeType === 'date'">
            <BaseDatePicker v-model="orderInfo.orderMakeDate" mode="dateTime" is24hr />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseRadio from '@/components/ui/BaseRadio.vue';
import BaseTab from '@/components/ui/BaseTab.vue';
import TypeOrderDelivery from './typeOrders/TypeOrderDelivery.vue';
import TypeOrderPickup from './typeOrders/TypeOrderPickup.vue';
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue';
import { reactive, type Component, ref } from 'vue';

interface ItypeOrder {
  title: string;
  id: 'delivery' | 'pickup';
}

const TYPE_DELIVERIES_MAP: Record<ItypeOrder['id'], Component> = {
  delivery: TypeOrderDelivery,
  pickup: TypeOrderPickup,
} as const;

const typeOrder = ref<ItypeOrder>({ title: 'Доставка', id: 'delivery' });

const orderMakeTypes = ref([
  { label: 'Как можно скорее', value: 'urgent' },
  { label: 'По вемени', value: 'date' },
]);

const deliveryTabs: ItypeOrder[] = [
  { title: 'Доставка', id: 'delivery' },
  { title: 'Самовывоз', id: 'pickup' },
];

const orderInfo = reactive({
  name: '',
  phone: '',
  email: '',
  delivery: {
    street: '',
    house: '',
    porch: '',
    floor: '',
    flat: '',
    door_station: '',
  },
  pickup: '',
  orderMakeType: orderMakeTypes.value[0].value,
  orderMakeDate: new Date(),
  orderMakeTime: '',
});
</script>

<style scoped lang="less">
.order-form {
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
}
</style>
