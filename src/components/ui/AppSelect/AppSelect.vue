<template>
  <div
    class="select"
    :class="{ open: open }"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      class="select__selected"
      :class="[{ chosen: modelValue?.value }]"
      @click="open = !open"
    >
      {{ modelValue?.text }}
      <AppIcon name="IconArrowDown"></AppIcon>
    </div>
    <div class="select__items" :class="{ hide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="setSelectValue(option)"
        class="select__item"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
import type { SelectItem } from "./select.types";
import AppIcon from "../AppIcon/AppIcon.vue";
export default defineComponent({
  components: {
    AppIcon,
  },
  props: {
    options: {
      type: Array as PropType<Array<SelectItem>>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<SelectItem>,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(_, { emit }) {
    const open = ref(false);
    const setSelectValue = (option: SelectItem) => {
      emit("update:modelValue", option);
      open.value = false;
    };
    return {
      open,
      setSelectValue,
    };
  },
});
</script>

<style scoped lang="less">
.select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 48px;
  max-width: 310px;
  line-height: 48px;
  &.open {
    .select__selected {
      border-radius: 6px 6px 0 0;
      border-color: @main-color;
      svg {
        transform: translateY(-50%) rotate(-180deg);
      }
    }
    .select__items {
      border-color: @main-color;
    }
  }
  &__selected {
    padding-left: 1em;
    padding-right: 40px;
    cursor: pointer;
    user-select: none;
    font-weight: 400;
    height: 100%;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    color: @gray-color;
    transition: all 0.3s ease;
    &.chosen {
      color: @black-color;
    }
    svg {
      position: absolute;
      right: 13.5px;
      z-index: 1;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
    }
  }
  &__items {
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    background-color: #fff;
    border-right: 1px solid #f0f0f0;
    border-left: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    transition: all 0.3s ease;
    z-index: 1;
    &.hide {
      visibility: hidden;
      opacity: 0;
    }
  }
  &__item {
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    &:hover {
      background-color: @main-color;
      color: #fff;
    }
  }
}
</style>
