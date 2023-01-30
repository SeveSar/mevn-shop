<template>
  <Teleport to="body">
    <transition name="fade">
      <div class="modal-overlay" v-if="isOpen" @mousedown.self="close">
        <div class="modal">
          <button class="modal-close" @click="close">
            <img src="@/assets/images/icons/close.svg" alt="" />
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
  </Teleport>
</template>

<script lang="ts">
import { ref } from "vue";

import { defineComponent, onMounted, onUnmounted, watch } from "vue";
export default defineComponent({
  emits: ["onClose"],
  setup(_, { emit }) {
    const isOpen = ref(false);

    const close = () => {
      isOpen.value = false;
      emit("onClose");
    };
    const show = () => {
      isOpen.value = true;
    };
    const onKeyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    onMounted(() => {
      document.body.addEventListener("keydown", onKeyHandler);
    });
    onUnmounted(() => {
      document.body.removeEventListener("keydown", onKeyHandler);
    });
    watch(isOpen, (val) => {
      if (val) document.body.classList.add("no-scroll");
      else document.body.classList.remove("no-scroll");
    });
    return {
      isOpen,
      close,
      show,
    };
  },
});
</script>

<style scoped lang="less">
.modal {
  background: #f9f9f9;
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
