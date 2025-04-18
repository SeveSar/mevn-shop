<script lang="ts">
import { useModalFunctions } from '@/composables/modalFunctions';
import { defineComponent, toRefs } from 'vue';
import BaseIcon from './BaseIcon/BaseIcon.vue';

export default defineComponent({
  components: {
    BaseIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  emits: ['close', 'show'],
  setup(props, { emit }) {
    const { isOpen } = toRefs(props);

    useModalFunctions(isOpen, close);
    // methods
    function close() {
      emit('close');
    }

    return {
      close,
    };
  },
});
</script>

<template>
  <transition name="slide-panel">
    <div v-show="isOpen" class="side-panel-overlay" @mousedown.self="close">
      <transition name="slide-panel-inner">
        <div v-show="isOpen" class="side-panel">
          <button class="side-panel__close" @click="close">
            <BaseIcon class="side-panel__close-icon" name="IconCrossBig" />
          </button>
          <div class="side-panel__header">
            <h3 class="side-panel__title">
              {{ title }}
            </h3>
          </div>
          <div class="side-panel__content">
            <slot />
          </div>
          <div class="side-panel__footer">
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.side-panel {
  background: #ffffff;
  max-width: 520px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  color: #191919;
  padding-top: 35px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media screen and (max-width: $breakpoint-sm) {
    max-width: 100%;
  }

  &--active {
    opacity: 1;
    transition: all 0.3s ease;
    transition-delay: 1s;
    transform: translateX(0%);
  }

  &__title {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: $black-color;
  }

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    color: $gray2-color;
    transition: all 0.3s ease;
    top: 40px;
    right: 20px;
    &:hover {
      transform: translateY(-3px);
    }

    &-icon {
      width: 25px;
      height: auto;
    }
  }

  &__content,
  &__header {
    padding: 0 20px;
  }

  &__header {
    margin-bottom: 20px;
  }

  &__content {
    margin-bottom: 28px;
  }

  &__footer {
    padding: 12px 20px 12px;
    border-top: 1px solid $gray-color;
    margin-top: auto;
    position: sticky;
    bottom: 0;
    background-color: $white-color;
  }
}

.side-panel-overlay {
  background: rgba(25, 25, 25, 0.4);
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: $breakpoint-sm) {
    padding: 20px;
  }
}

.slide-panel-enter-active {
  transition: opacity 0.3s ease;
}
.slide-panel-leave-active {
  transition: opacity 0.3s ease 0.1s;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  opacity: 0;
}

.slide-panel-inner-enter-active {
  transition: all 0.3s ease 0.1s;
}
.slide-panel-inner-leave-active {
  transition: all 0.3s ease;
}

.slide-panel-inner-enter-from,
.slide-panel-inner-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
