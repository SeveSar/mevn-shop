<template>
  <label class="base-input">
    <span class="base-input__label" v-if="labelText">
      {{ labelText }}<span class="base-input__label__required" v-if="required">*</span>
    </span>

    <input
      class="base-input__control"
      :class="{ error: errors }"
      :value="modelValue"
      @input="updateValue"
      @blur="onBlur"
      @focus="onFocus"
      :placeholder="placeholder"
      :type="type"
      data-testid="base-input"
    />

    <transition name="fade">
      <small class="base-input__error" v-if="errors">{{ errors }}</small>
    </transition>
  </label>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string | number;
  labelText?: string;
  errors?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  required?: boolean;
}
withDefaults(defineProps<Props>(), {
  labelText: '',
  errors: '',
  placeholder: '',
  type: 'text',
  required: false,
});

const emit = defineEmits(['update:modelValue', 'onBlur', 'onFocus']);

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
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
      border-color: red;
    }
  }
  &__label {
    text-align: left;
    font-size: 14px;
    line-height: 18px;
    display: inline-block;
    color: #a5a5a5;
    margin-bottom: 8px;
  }
  &__error {
    color: red;
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
