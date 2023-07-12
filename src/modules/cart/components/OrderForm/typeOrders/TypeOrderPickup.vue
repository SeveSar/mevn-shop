<template>
  <div class="order-pickup">
    <BaseInput v-model="modelValue" label-text="Ресторан" :required="true" placeholder="Выберите ресторан" />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import { computed } from 'vue';

interface Props {
  modelValue: string;
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

<style scoped></style>
