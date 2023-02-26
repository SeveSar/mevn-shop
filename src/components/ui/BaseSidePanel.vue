<template>
  <Teleport to="body">
    <transition name="side">
      <div class="side-panel-overlay" v-if="isOpen" @mousedown.self="close">
        <div class="side-panel">
          <button class="side-panel__close" @click="close">
            <img src="@/assets/images/icons/close.svg" alt="" />
          </button>
          <div class="side-panel__header">
            <h3 class="side-panel__title">
              {{ title }}
            </h3>
          </div>
          <div class="side-panel__content">
            <slot></slot>
          </div>
          <div class="side-panel__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
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
    title: {
      type: String,
      default: null,
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
.side-panel {
  background: #f9f9f9;

  max-width: 520px;
  position: absolute;
  right: 0;
  width: 100%;
  color: #191919;
  padding-top: 35px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  &__content {
    padding: 0 20px;
  }
  &__footer {
    padding: 12px 20px 12px;
    border-top: 1px solid @gray-color;
    margin-top: auto;
  }
}

.side-panel-overlay {
  background: rgba(25, 25, 25, 0.4);
  backdrop-filter: blur(32px);
  z-index: 1001;
  position: relative;
  overflow: auto;

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
