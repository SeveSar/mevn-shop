<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: [Array, Boolean], required: true },
    value: { type: [Boolean, Number] },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    const isChecked = computed(() => {
      if (typeof props.modelValue === 'boolean') {
        return model.value;
      }

      else if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
      }

      return false;
    });
    return {
      isChecked,
      model,
    };
  },
});
</script>

<template>
  <label class="base-checkbox" :class="{ 'base-checkbox--active': isChecked }">
    <input v-model="model" type="checkbox" class="base-checkbox__control" :value="value" :disabled="disabled">

    {{ label }}
  </label>
</template>

<style scoped lang="scss">
.base-checkbox {
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  position: relative;
  cursor: pointer;
  padding-left: 24px;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    border: 1px solid $gray2-color;
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 1px;
  }

  &--active {
    &::before {
      border-color: $main-color;
      background-color: $main-color;
      background-image: url('@/assets/images/icons/tick.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &__control {
    display: none;
  }
}
</style>
