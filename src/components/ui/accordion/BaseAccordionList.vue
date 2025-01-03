<script setup lang="ts">
import { provide, reactive } from 'vue';

interface Props {
  isCloseOthers?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isCloseOthers: true,
});

const accordion = reactive({
  count: 0,
  active: null,
});

provide('accordion', accordion);
provide('isCloseOthers', props.isCloseOthers);
</script>

<template>
  <div class="accordion-list">
    <slot />
  </div>
</template>

<style scoped></style>
