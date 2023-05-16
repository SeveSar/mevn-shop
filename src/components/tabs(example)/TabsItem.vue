<template>
  <div class="tab-content" v-if="selectedTab === name">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  setup() {
    const selectedTab = inject("selectedTab");
    return {
      selectedTab,
    };
  },
});
</script>

<style scoped lang="less"></style>
