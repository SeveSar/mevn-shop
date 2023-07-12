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
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseRadio from '@/components/ui/BaseRadio.vue';
import BaseTab from '@/components/ui/BaseTab.vue';
import TypeOrderDelivery from './typeOrders/TypeOrderDelivery.vue';
import TypeOrderPickup from './typeOrders/TypeOrderPickup.vue';
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
});

const deliveryTabs: ItypeOrder[] = [
  { title: 'Доставка', id: 'delivery' },
  { title: 'Самовывоз', id: 'pickup' },
];
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

  &__tab {
    &:deep(.base-tab__tab) {
      min-width: 170px;
    }
  }
}
</style>
