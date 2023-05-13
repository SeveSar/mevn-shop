<template>
  <div class="base-tab" :class="classes">
    <div class="base-tab__nav">
      <button
        class="base-tab__tab"
        @click.prevent="$emit('update:modelValue', tab)"
        :class="{ 'base-tab__tab--active': tab.id === modelValue?.id }"
        v-for="tab in items"
        :key="tab.id"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="base-tab__content" v-if="$slots.default">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

interface ITab {
  title: string;
  id: string;

  [key: string]: string | number | boolean;
}

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ITab | null>,
      required: true,
    },

    items: {
      type: Array as PropType<ITab[]>,
      required: true,
    },

    size: {
      type: String as PropType<"small" | "medium">,
      default: "medium",
    },
  },
  emits: ["update:modelValue"],

  setup(props) {
    const classes = computed(() => {
      return {
        [`base-tab-size--${props.size}`]: true,
      };
    });
    return {
      classes,
    };
  },

  mounted() {
    console.log(this.$slots, "slots");
  },
});
</script>

<style scoped lang="less">
.base-tab {
  &__nav {
    display: flex;
  }

  &__tab {
    border-radius: 6px;
    background-color: @white-color;
    font-size: 16px;
    line-height: 18px;
    color: @black-color;
    min-width: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 16px;

    &--active {
      background-color: @main-color;
      color: @white-color;
    }
  }

  &-size {
    &--small {
      .base-tab__tab {
        min-height: 44px;
      }
    }

    &--medium {
      .base-tab__tab {
        min-height: 48px;
      }
    }
  }
}
</style>
