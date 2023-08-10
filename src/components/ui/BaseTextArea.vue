<template>
  <div class="ui-area">
    <textarea ref="textarea" class="ui-area__control" :placeholder="placeholder" v-model="input"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';

interface Props {
  placeholder?: string;
  modelValue: string;
}
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
});

const { textarea, input } = useTextareaAutosize();
watch(input, (val) => {
  emit('update:modelValue', val);
});
</script>

<style scoped lang="less">
.ui-area {
  &__control {
    border: 1px solid @gray-color;
    border-radius: 6px;
    resize: none;
    transition: border-color 0.3s ease;
    padding: 13px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    min-height: 150px;
    color: @black-color;
    &::placeholder {
      color: @gray2-color;
    }
    &:focus {
      outline: none;
      border-color: @main-color;
    }
  }
}
</style>
