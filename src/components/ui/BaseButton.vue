<template>
  <button
    :class="classes"
    :type="type"
    class="button"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { PropType, ButtonHTMLAttributes } from "vue";
export default defineComponent({
  props: {
    variant: {
      type: String as PropType<"primary" | "secondary" | "text" | "border">,
      default: "primary",
    },
    size: {
      type: String,
    },
    rounded: {
      type: Boolean,
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click(): boolean {
      return true;
    },
  },

  setup(props) {
    const classes = computed(() => ({
      [`button-variant--${props.variant}`]: true,
      [`button-size--${props.size}`]: true,
    }));
    return {
      classes,
    };
  },
});
</script>

<style lang="less" scoped>
.button {
  font-family: "SF-Pro";
  font-weight: 400;
  color: #ffffff;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 22px;
  border-radius: 6px;
  min-height: 48px;

  &-variant {
    &--primary {
      min-height: 48px;
      padding: 10px 25px;
      background: @main-color;
      &:hover {
        background-color: darken(@main-color, 15%);
      }
    }

    &--secondary {
      background-color: @gray-color;
      line-height: 1;
      color: @black-color;
      &:hover,
      &.active {
        background-color: @red-color;
        color: #fff;
      }
    }

    &--border {
      background-color: @gray-color;
      line-height: 1;
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
    }
  }

  &-size {
    &--small {
      padding: 10px;
      min-height: 35px;
    }
  }
}
</style>
