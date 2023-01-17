<template>
  <div class="form-group">
    <label :for="id"> {{ labelText }} </label>
    <input
      class="form-control"
      :id="id"
      :class="{ error: errors }"
      :value="modelValue"
      @input="updateValue"
      @blur="onBlur"
      @focus="onFocus"
      v-bind="$attrs"
    />
    <transition name="fade">
      <small v-if="errors">{{ errors }}</small>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
export default defineComponent({
  inheritAttrs: false,
  emits: ["update:modelValue", "onBlur", "onFocus"],
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    labelText: {
      type: String,
      default: null,
    },
    errors: {
      type: null as unknown as PropType<string | null>,
      default: null,
      validator: (v: any) => typeof v === "string" || v === null,
    },
  },
  setup(props, { emit }) {
    const updateValue = (e: Event) => {
      emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    const onBlur = () => {
      emit("onBlur");
    };
    const onFocus = () => {
      emit("onFocus");
    };
    return {
      updateValue,
      onBlur,
      onFocus,
    };
  },
});
</script>

<style scoped lang="less">
.form-group {
  position: relative;
}
.form-control {
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 6px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  padding: 0 16px;
  line-height: 22px;
  width: 100%;
  color: #000;
  transition: all 0.2s linear;

  &::placeholder {
    color: #a5a5a5;
  }
  &:focus {
    border-color: #ff7010;
    outline: none;
  }
  &.error {
    border-color: red;
  }
}
label {
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  display: inline-block;
  color: #a5a5a5;
  margin-bottom: 8px;
}
small {
  color: red;
  display: inline-block;
  margin-top: 5px;
  position: absolute;
  bottom: -19px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
