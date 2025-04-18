<script setup lang="ts">
import { computed, inject, ref } from 'vue';

const accordion = inject('accordion') as { count: number, active: null | number };
const isCloseOthers = inject('isCloseOthers') as boolean;

const index = ref<number>(accordion.count++);
const isOpen = ref(false);

const visible = computed(() => {
  if (isCloseOthers) {
    return accordion.active === index.value;
  }
  else {
    return isOpen.value;
  }
});
function open() {
  if (visible.value) {
    accordion.active = null;
  }
  else {
    accordion.active = index.value;
  }

  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="accordion-item">
    <div class="accordion-item__trigger" @click="open">
      <slot name="trigger" :is-visible="visible" />
    </div>

    <div class="accordion-item__content" :class="{ 'accordion-item__content--active': visible }">
      <div class="accordion-item__content-wrap">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accordion-item {
  &__trigger {
    cursor: pointer;
  }

  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition:
      grid-template-rows 500ms,
      -ms-grid-rows 500ms;

    &--active {
      grid-template-rows: 1fr;
    }

    &-wrap {
      overflow: hidden;
      padding-top: 12px;
    }
  }
}
</style>
