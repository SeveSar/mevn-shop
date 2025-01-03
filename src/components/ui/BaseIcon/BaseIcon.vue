<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const loadAsyncIcon = computed(() => defineAsyncComponent(() => import(`../icons/${props.name}.vue`)));
    return {
      loadAsyncIcon,
    };
  },
});
</script>

<template>
  <component :is="loadAsyncIcon" />
</template>

<style scoped></style>
