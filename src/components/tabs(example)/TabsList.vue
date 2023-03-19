<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li v-for="tab in tabNames" :key="tab" @click="selectedTab = tab">
        {{ tab }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    let tabNames = ref<string[]>([]);
    const selectedTab = ref("");
    provide("selectedTab", selectedTab);
    if (slots.default) {
      tabNames.value = slots
        .default()
        .map((tab) => (tab.props as { name: string }).name);
      selectedTab.value = tabNames.value[0];
    }
    return {
      tabNames,
      selectedTab,
    };
  },
});
</script>

<style scoped lang="less">
.tabs {
  &__header {
    display: flex;
  }
  li {
    padding: 20px;
    background-color: blue;
    margin: 0 10px;
  }
}
</style>
