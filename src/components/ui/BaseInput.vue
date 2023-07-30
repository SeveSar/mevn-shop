<template>
  <label class="base-input">
    <span class="base-input__label" v-if="labelText">
      {{ labelText }}
      <span class="base-input__label-required" v-if="required">*</span>
    </span>

    <input
      v-model="model"
      class="base-input__control"
      :class="{ error: errors }"
      :value="value ? value : model"
      :placeholder="placeholder"
      :type="type"
      data-testid="base-input"
      :disabled="disabled"
      @blur="onBlur"
      @focus="onFocus"
    />

    <transition name="fade">
      <small class="base-input__error" v-if="errors">{{ errors }}</small>
    </transition>
  </label>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  modelValue?: string | number;
  labelText?: string;
  errors?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
}
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

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const onBlur = () => {
  emit('onBlur');
};
const onFocus = () => {
  emit('onFocus');
};
</script>

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
