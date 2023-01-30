<template>
  <div class="form-group">
    <input
      :id="id"
      type="checkbox"
      :value="value"
      :disabled="disabled"
      @change="onChange"
      :checked="isChecked"
    />
    <label :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: null as unknown as PropType<number[] | boolean>,
      default: null,
      validator: (v: any) => typeof v === "boolean" || Array.isArray(v),
    },
    value: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onChange = (event: Event) => {
      const elem = event.target as HTMLInputElement;
      let isChecked = elem.checked;
      if (props.modelValue instanceof Array) {
        let newValue = [...props.modelValue];
        if (isChecked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit("update:modelValue", newValue);
      } else {
        emit("update:modelValue", isChecked ? true : false);
      }
    };
    const isChecked = computed(() => {
      if (props instanceof Array) {
        return props.includes(props.value);
      }
      return props.modelValue === true;
    });
    return {
      onChange,
      isChecked,
    };
  },
});
</script>

<style scoped lang="less">
.form-group {
  input {
    display: none;
    &:checked ~ label {
      &::before {
        border-color: @main-color;
        background-color: @main-color;
        background-image: url("@/assets/images/icons/tick.svg");
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    position: relative;
    cursor: pointer;
    padding-left: 24px;
    &:before {
      content: "";
      width: 16px;
      height: 16px;
      border: 1px solid @gray-color;
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
