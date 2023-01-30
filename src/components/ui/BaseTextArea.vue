<template>
  <div class="form-group">
    <textarea
      :style="{ height, width }"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "100px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
});
</script>

<style scoped lang="less">
textarea {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  resize: none;
  transition: all 0.3s ease;
  padding: 13px 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: @black-color;
  &::placeholder {
    color: @gray-color;
  }
  &:focus {
    outline: none;
    border-color: @main-color;
  }
}
</style>
