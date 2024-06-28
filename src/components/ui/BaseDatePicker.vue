<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';
import BaseInput from './BaseInput.vue';
import type { TMaskKeys } from '@/configs/mask';

interface Props {
  modelValue: string | Date | null
  errors?: string | null
  mask?: TMaskKeys
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <DatePicker v-model="model" color="main" :popover="{ visibility: 'click' }">
    <template #default="{ inputValue, inputEvents }">
      <BaseInput
        class="order-form__date-control"
        :errors="errors"
        placeholder="Дата"
        :value="inputValue"
        :mask="mask"
        v-on="inputEvents"
      />
    </template>
  </DatePicker>
</template>

<style scoped lang="less"></style>
