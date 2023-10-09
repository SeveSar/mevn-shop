<template>
  <transition name="fade">
    <div class="modal-overlay" v-if="isOpen" @mousedown.self="close" data-testid="base-modal-overlay">
      <div class="modal">
        <button class="modal-close" @click="close" data-testid="button-close">
          <IconCrossBig class="modal-close__icon" />
        </button>
        <div class="modal__header" v-if="$slots.header">
          <slot name="header"></slot>
        </div>
        <div class="modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineComponent, toRefs, watch } from 'vue';
import { useModalFunctions } from '@/composables/modalFunctions';
import IconCrossBig from '@/components/ui/icons/IconCrossBig.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'show']);

const { isOpen } = toRefs(props);

useModalFunctions(isOpen, close);

//methods
function close() {
  emit('close');
}
</script>

<style scoped lang="less">
.modal {
  background: @white-color;
  border-radius: 24px;
  max-width: 850px;
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

  &:hover {
    transform: translateY(-3px);
  }

  &__icon {
    width: 30px;
    height: auto;
    color: @white-color;
  }
}

.modal-overlay {
  display: flex;
  background: rgba(25, 25, 25, 0.4);
  backdrop-filter: blur(32px);
  z-index: 1001;
  position: relative;
  overflow: auto;
  padding: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 600px) {
    padding: 20px;
  }
}
</style>
