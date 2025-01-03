<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>

<template>
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>
