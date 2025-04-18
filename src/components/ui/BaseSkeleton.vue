<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  width?: number | string
  height?: number | string
  corner?: string | number
  theme?: 'light' | 'dark'
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 10,
  corner: 1,
  theme: 'light',
});

const _width = computed(() => (isNumeric(props.width) ? `${props.width}px` : props.width));
const _height = computed(() => (isNumeric(props.height) ? `${props.height}px` : props.height));
const _corner = computed(() => (isNumeric(props.corner) ? `${props.corner}px` : props.corner));
const _background = computed(() => (props.theme === 'dark' ? 'rgba(255,255,255, 0.2)' : '#dddbdd'));
const styles = computed(() => ({
  width: _width.value,
  height: _height.value,
  borderRadius: _corner.value,
  background: _background.value,
}));

function isNumeric(value: string | number) {
  if (typeof value === 'number') {
    return true;
  }
  return /^\d+$/.test(value);
}
</script>

<template>
  <div class="skeleton" :style="styles " />
</template>

<style lang="scss" scoped>
.skeleton {
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: wave 1.3s linear 0.5s infinite;
}
@keyframes wave {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  65% {
    opacity: 1;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(100%);
  }
}
</style>
