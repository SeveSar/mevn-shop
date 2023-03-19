<template>
  <div class="base-tab">
    <div class="base-tab__nav">
      <button
        class="base-tab__tab"
        @click.prevent="$emit('onSelectTab', tab)"
        :class="{ 'base-tab__tab--active': tab.id === selectedTab.id }"
        v-for="tab in items"
        :key="tab.id"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
  <div class="base-tab__content" v-if="$slots.default">
    <slot name="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
interface ITab {
  name: string;
  id: number;
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<ITab[]>,
      required: true,
    },
    selectedTab: {
      type: Object as PropType<ITab>,
      required: true,
    },
    // size: {
    //     type:
    //   }
  },
  setup() {
    return {};
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
    background-color: @main-color;
    font-size: 16px;
    line-height: 18px;
    color: @black-color;
    min-width: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 16px;

    &--active {
      color: @main-color;
    }
  }
}
</style>
