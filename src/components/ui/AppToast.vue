<template>
  <transition-group name="toast">
    <div class="toast" v-for="item in toasts" :class="item.type" :key="item.id" @click="removeToast(item.id)">
      <!-- <AppIcon class="toast__icon" :name="getCurrentIcon(item.type)" /> -->
      <div class="toast__text">
        {{ item.text }}
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { IToast, TypeToast } from '@/plugins/plugins.types';

import { useToastStore } from '@/stores/toast';

const ICONS_TYPES = {
  error: 'IconError',
  info: 'IconInfo',
} as const;

export default defineComponent({
  components: {
    // AppIcon,
  },

  setup() {
    let id: number = 0;
    let timer: number;
    const getCurrentIcon = (type: 'error' | 'info') => {
      return ICONS_TYPES[type];
    };
    const toasts = ref<IToast[]>([]);

    const showToast = (toast: { type: TypeToast; text: string }) => {
      id++;
      const newToast = {
        ...toast,
        id,
      } as IToast;
      toasts.value.push(newToast);
    };

    const removeToast = (id: number) => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
      id--;
    };

    watch(
      toasts,
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          toasts.value.shift();
        }, 2000);
      },
      { deep: true }
    );

    return {
      toasts,
      getCurrentIcon,
      showToast,
      removeToast,
    };
  },
});
</script>

<style lang="less">
#app-toast {
  position: fixed;
  bottom: 30px;
  right: 20px;
  z-index: 1500;
}
.toast {
  padding: 20px;
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  margin-left: auto;

  &__text {
    font-size: 17px;
    white-space: pre-wrap;
    flex-shrink: 0;
  }

  &__icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    flex-shrink: 0;
    color: red;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &.error {
    background-color: #dc4c64;
    color: #fcf6f5ff;
  }
  &.info {
    background-color: #3b71ca;
    color: #fcf6f5ff;
  }
}
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-active {
  position: absolute;
}
</style>
