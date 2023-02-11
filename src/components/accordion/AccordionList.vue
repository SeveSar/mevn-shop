<template>
  <ul class="accordion">
    <li>
      <slot></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";

export default defineComponent({
  name: "AccordionList",
  setup(_, { slots }) {
    const activeItem = ref();
    provide("activeItem", activeItem);
    const onClick = (id: number) => {
      console.log(id);
    };
    return {
      onClick,
      activeItem,
    };
  },
});
</script>

<style scoped></style>
