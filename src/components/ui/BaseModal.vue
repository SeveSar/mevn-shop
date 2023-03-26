<template>
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
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  type PropType,
  toRefs,
  watch,
} from "vue";
export default defineComponent({
  emits: ["close", "show"],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    //state
    const { isOpen } = toRefs(props);
    //methods
    const close = () => {
      emit("close");
    };
    const show = () => {
      emit("show");
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
      close,
      show,
    };
  },
});
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
