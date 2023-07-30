<template>
  <DatePicker v-model="modelValue" :popover="{ visibility: 'click' }" :masks="{ input: 'DD-MM-YYYY' }">
    <template #default="{ inputValue, inputEvents }">
      <BaseInput class="order-form__date-control" disabled placeholder="Дата" :value="inputValue" v-on="inputEvents" />
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';
import BaseInput from './BaseInput.vue';

interface Props {
  modelValue: string | Date;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style scoped lang="less"></style>
