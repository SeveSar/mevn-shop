<script setup lang="ts">
import type { Validation } from '@vuelidate/core';
import type { Ref } from 'vue';
import { BaseInput } from 'pizza-mevn-ui-kit';
import { computed, inject } from 'vue';

interface Props {
  modelValue: string
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const v$ = inject('v$') as Ref<Validation>;
const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <div class="order-pickup">
    <BaseInput
      v-model="modelValue"
      label-text="Ресторан"
      :required="true"
      :errors="v$?.delivery?.restaurant?.$error ? v$.delivery.restaurant.$errors[0].$message as string : null"
      placeholder="Выберите ресторан"
    />
  </div>
</template>

<style scoped></style>
