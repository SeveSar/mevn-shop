<template>
  <component
    :is="currentComponent"
    :class="classes"
    :to="to ? to : null"
    :type="to ? null : type"
    class="button"
    @click="emit('click')"
  >
    <slot v-if="!isLoading" />

    <template v-else>
      <BaseIcon class="button__loading" name="IconSpinner" />
      Загрузка
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ButtonHTMLAttributes } from 'vue';
import BaseIcon from './BaseIcon/BaseIcon.vue';

interface Props {
  variant?: 'default' | 'text' | 'border';
  color?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  rounded?: boolean;
  type?: ButtonHTMLAttributes['type'];
  disabled?: boolean;
  isLoading?: boolean;
  to?: { name: string } | string | null;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'medium',
  color: 'primary',
  rounded: false,
  type: 'button',
  disabled: false,
  isLoading: false,
  to: null,
});
const emit = defineEmits(['click']);

const classes = computed(() => ({
  [`button-variant--${props.variant}`]: true,
  [`button-size--${props.size}`]: true,
  [`button--disabled`]: props.disabled,
  [`button--loading`]: props.isLoading,
  [`button-color--${props.color}`]: true,
}));

const currentComponent = computed(() => {
  return props.to ? 'router-link' : 'button';
});
</script>

<style lang="less" scoped>
.button {
  user-select: none;
  font-family: 'SF-Pro';
  font-weight: 400;
  color: #ffffff;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 22px;
  border-radius: 6px;

  &__loading {
    color: @white-color;
    animation: spinner 1s infinite linear;
    margin-right: 8px;
  }

  &-color {
    &--primary {
      color: @main-color;

      &.button-variant--default {
        background: @main-color;
        color: @white-color;
        &:hover {
          background-color: darken(@main-color, 15%);
        }
      }
    }

    &--secondary {
      color: @gray-color;

      &.button-variant--default {
        background-color: @gray-color;
        color: @black-color;
        &:hover,
        &.active {
          background-color: @red-color;
          color: #fff;
        }
      }
    }
  }

  &-variant {
    &--default {
      min-height: 48px;
      padding: 10px 25px;
    }

    &--border {
      background-color: @gray-color;
      background-color: transparent;
      color: @black-color;
      border: 1px solid @main-color;
      border-radius: 6px;
      padding: 10px 25px;
      color: @main-color;
    }

    &--text {
      padding: 0;
      background: none;
      min-height: auto;
    }
  }

  &-size {
    &--small {
      padding: 10px;
      min-height: 35px;
    }
  }

  &--loading {
    pointer-events: none;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
