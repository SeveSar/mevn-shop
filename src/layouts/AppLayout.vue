<template>
  <component :is="route.meta.layoutComponent">
    <slot />
  </component>
</template>
<script lang="ts">
import { useRoute } from 'vue-router';
import { type VueElement, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>
