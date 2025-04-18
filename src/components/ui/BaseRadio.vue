<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: null as unknown as PropType<string | null>,
      default: null,
      validator: val => typeof val === 'string',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onChange = () => {
      emit('update:modelValue', props.value);
    };
    return {
      onChange,
    };
  },
});
</script>

<template>
  <label class="base-radio" :class="{ 'base-radio--active': modelValue === value }">
    <input class="base-radio__control" type="radio" :name="name" :value="value" @change="onChange">
    <div v-if="label" class="base-radio__label">
      {{ label }}
    </div>
  </label>
</template>

<style scoped lang="scss">
.base-radio {
  position: relative;
  padding-left: 24px;
  display: flex;
  cursor: pointer;

  &:hover {
    &::before {
      border-color: $main-color;
    }
  }

  &::after,
  &::before {
    content: '';
    position: absolute;
    transition-duration: 0.2s;
  }

  &::before {
    left: 0;
    top: 0;
    border: 1px solid #a5a5a5;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
  &::after {
    background-color: $main-color;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    opacity: 0;
    left: 4px;
    top: 4px;
  }
  &__control {
    display: none;
  }
  &__label {
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    color: $black-color;
  }

  &--active {
    &::before {
      border-color: $main-color;
    }
    &::after {
      opacity: 1;
    }
  }
}
</style>
