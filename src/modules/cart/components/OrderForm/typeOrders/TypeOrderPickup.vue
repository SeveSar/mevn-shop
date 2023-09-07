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

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import { Validation } from '@vuelidate/core';
import { Ref, computed, inject } from 'vue';

interface Props {
  modelValue: string;
}
const v$ = inject('v$') as Ref<Validation>;
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

<style scoped></style>
