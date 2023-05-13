<template>
  <label class="base-checkbox" :class="{ 'base-checkbox--active': isChecked }">
    <input type="checkbox" class="base-checkbox__control" :value="value" :disabled="disabled" @change="onChange" :checked="isChecked" />

    {{ label }}
  </label>
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
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
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
.base-checkbox {
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  position: relative;
  cursor: pointer;
  padding-left: 24px;
  &:before {
    content: "";
    width: 16px;
    height: 16px;
    border: 1px solid @gray2-color;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 1px;
  }
  &--active {
    &::before {
      border-color: @main-color;
      background-color: @main-color;
      background-image: url("@/assets/images/icons/tick.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &__control {
    display: none;
  }
}
</style>
