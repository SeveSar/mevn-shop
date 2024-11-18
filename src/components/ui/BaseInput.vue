<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import type { InputMask } from 'imask';
import IMask from 'imask';
import type { TMaskKeys } from '@/configs/mask';
import { getMask } from '@/configs/mask';

interface Props {
  modelValue: string | number | null
  labelText?: string
  errors?: string | null
  placeholder?: string
  type?: 'text' | 'number' | 'password'
  required?: boolean
  disabled?: boolean
  mask?: TMaskKeys
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  labelText: '',
  errors: '',
  placeholder: '',
  type: 'text',
  required: false,
  disabled: false,
  value: '',
});

const emit = defineEmits(['update:modelValue', 'onBlur', 'onFocus']);

let maskInstance: InputMask<object> | null = null;

const inputRef = ref(null);

function maskInit() {
  if (!props.mask) {
    return;
  }
  if (!inputRef.value) { return; }
  maskInstance = IMask(inputRef.value, getMask(props.mask));

  maskInstance.on('accept', handleAccept);
  emit('update:modelValue', maskInstance.value);
}
onMounted(() => {
  maskInit();
});

function handleAccept() {
  if (!maskInstance) { return; }
  emit('update:modelValue', maskInstance.value);
  // maskInstance.updateValue();
}
function updateModelValue(e: Event) {
  if (!props.mask) {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
  }
}

function getUnMaskedValue() {
  if (!maskInstance) { return; }
  return maskInstance.unmaskedValue;
}
onUnmounted(() => {
  if (maskInstance) {
    maskInstance.off('accept', handleAccept);
    maskInstance?.destroy();
  }
});

defineExpose({
  getUnMaskedValue,
});

function onBlur() {
  emit('onBlur');
}
function onFocus() {
  emit('onFocus');
}
</script>

<template>
  <label class="base-input">
    <span v-if="labelText" class="base-input__label">
      {{ labelText }}
      <span v-if="required" class="base-input__label-required">*</span>
    </span>

    <input
      ref="inputRef" class="base-input__control" :class="{ error: errors }"
      :value="modelValue" :placeholder="placeholder" :type="type" data-testid="base-input" :disabled="disabled"
      v-bind="$attrs" @blur="onBlur" @focus="onFocus" @input="updateModelValue"
    >

    <transition name="fade">
      <small v-if="errors" class="base-input__error">{{ errors }}</small>
    </transition>
  </label>
</template>

<style scoped lang="less">
.base-input {
  position: relative;
  display: block;
  cursor: pointer;

  &__control {
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
    border-radius: 6px;
    height: 48px;
    font-weight: 400;
    font-size: 16px;
    padding: 0 16px;
    line-height: 22px;
    width: 100%;
    background-color: #ffffff;
    color: #000;
    transition: all 0.2s linear;

    &::placeholder {
      color: #a5a5a5;
    }

    &:focus {
      border-color: #ff7010;
      outline: none;
    }

    &.error {
      border-color: @red-color;
    }
  }

  &__label {
    text-align: left;
    font-size: 14px;
    line-height: 18px;
    display: inline-block;
    color: #a5a5a5;
    margin-bottom: 8px;

    &-required {
      color: @red-color;
    }
  }

  &__error {
    color: @red-color;
    display: inline-block;
    margin-top: 5px;
    position: absolute;
    bottom: -19px;
    left: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
