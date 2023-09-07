<template>
  <div class="order-delivery">
    <BaseInput
      v-model="localModelValue.street"
      label-text="Улица"
      :required="true"
      :errors="v$?.delivery?.address?.street.$error ? v$.delivery.address.street.$errors[0].$message as string : null"
    />
    <div class="order-delivery__row">
      <BaseInput v-model="localModelValue.house" mask="number" label-text="Дом" />
      <BaseInput v-model="localModelValue.porch" mask="number" label-text="Подъезд" />
      <BaseInput v-model="localModelValue.floor" mask="number" label-text="Этаж" />
      <BaseInput v-model="localModelValue.flat" mask="number" label-text="Квартира" />
      <BaseInput v-model="localModelValue.door_phone" mask="number" label-text="Домофон" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import { Validation } from '@vuelidate/core';
import cloneDeep from 'lodash/cloneDeep';
import { Ref, inject, ref, watch } from 'vue';

interface IModelValue {
  street: string;
  house: string;
  porch: string;
  floor: string;
  flat: string;
  door_phone: string;
}

interface Props {
  modelValue: IModelValue;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const localModelValue = ref(cloneDeep(props.modelValue));
const v$ = inject('v$') as Ref<Validation>;

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
