<script lang="ts" setup>
import IconCrossBig from '@/components/ui/icons/IconCrossBig.vue';
import { useModalFunctions } from '@/composables/modalFunctions';
import { toRefs } from 'vue';

interface Props {
  isOpen: boolean
  contentWidth?: string
}
const props = withDefaults(defineProps<Props>(), {
  contentWidth: '850px',
});

const emit = defineEmits(['close', 'show']);

const { isOpen } = toRefs(props);

useModalFunctions(isOpen, close);

// methods
function close() {
  emit('close');
}
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-overlay" data-testid="base-modal-overlay" @mousedown.self="close">
      <div class="modal" :style="{ maxWidth: contentWidth }">
        <button class="modal-close" data-testid="button-close" @click="close">
          <IconCrossBig class="modal-close__icon" />
        </button>
        <div v-if="$slots.header" class="modal__header">
          <slot name="header" />
        </div>
        <div class="modal__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
.modal {
  background: @white-color;
  border-radius: 24px;
  margin: auto;
  width: 100%;
  padding: 60px 20px;
  color: #191919;
  position: relative;
}

.modal-close {
  position: absolute;
  right: -62px;
  top: 0;
  transition: all 0.3s ease;
  width: 30px;
  @media screen and (max-width: @breakpoint-xl) {
    right: -25px;
    width: 20px;
  }
  @media screen and (max-width: @breakpoint-lg) {
    display: none;
  }

  &:hover {
    transform: translateY(-3px);
  }

  &__icon {
    width: 100%;
    height: auto;
    color: @white-color;
  }
}

.modal-overlay {
  display: flex;
  background: rgba(25, 25, 25, 0.4);
  z-index: 1001;
  position: relative;
  overflow: auto;
  padding: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: @breakpoint-lg) {
    padding: 20px;
  }
}
</style>
