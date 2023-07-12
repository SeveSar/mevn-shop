<template>
  <div class="order-delivery">
    <div>
      <BaseInput v-model="localModelValue.street" label-text="Улица" :required="true" />
    </div>
    <div class="order-delivery__row">
      <BaseInput v-model="localModelValue.house" label-text="Дом" />
      <BaseInput v-model="localModelValue.porch" label-text="Подъезд" />
      <BaseInput v-model="localModelValue.floor" label-text="Этаж" />
      <BaseInput v-model="localModelValue.flat" label-text="Квартира" />
      <BaseInput v-model="localModelValue.door_station" label-text="Домофон" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import { cloneDeep } from 'lodash';
import { ref, watch } from 'vue';

interface IModelValue {
  street: string;
  house: string;
  porch: string;
  floor: string;
  flat: string;
  door_station: string;
}

interface Props {
  modelValue: IModelValue;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const localModelValue = ref(cloneDeep(props.modelValue));

watch(
  localModelValue,
  (val) => {
    emit('update:modelValue', val);
  },
  { deep: true }
);
</script>

<style scoped lang="less">
.order-delivery {
  &__row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 16px;
  }
}
</style>
