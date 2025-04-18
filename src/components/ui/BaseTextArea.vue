<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core';
import { watch } from 'vue';

interface Props {
  placeholder?: string
  modelValue: string
}
withDefaults(defineProps<Props>(), {
  placeholder: '',
});
const emit = defineEmits(['update:modelValue']);
const { textarea, input } = useTextareaAutosize();
watch(input, (val) => {
  emit('update:modelValue', val);
});
</script>

<template>
  <div class="ui-area">
    <textarea ref="textarea" v-model="input" class="ui-area__control" :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
.ui-area {
  &__control {
    border: 1px solid $gray-color;
    border-radius: 6px;
    resize: none;
    transition: border-color 0.3s ease;
    padding: 13px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    min-height: 150px;
    color: $black-color;
    &::placeholder {
      color: $gray2-color;
    }
    &:focus {
      outline: none;
      border-color: $main-color;
    }
  }
}
</style>
