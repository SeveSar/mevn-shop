<template>
  <BaseSidePanel
    :isOpen="modelValue"
    @close="$emit('update:modelValue', false)"
    @show="$emit('update:modelValue', true)"
    title="Фильтры"
    class="panel-product-filter"
  >
    <template #default>
      <div class="panel-product-filter__list">
        <div
          class="panel-product-filter__block"
          v-for="filter in filters"
          :key="filter.id"
        >
          <div class="panel-product-filter__item-title">
            {{ filter.title }}
          </div>
          <div class="panel-product-filter__items">
            <button
              class="panel-product-filter__item"
              v-for="value in filter.values"
              :key="value.id"
            >
              {{ value.name }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="panel-product-filter__actions">
        <BaseButton variant="border">Сбросить</BaseButton>
        <BaseButton>Применить</BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSidePanel from "@/components/ui/BaseSidePanel.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
    },
  },
  components: {
    BaseSidePanel,
    BaseButton,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.panel-product-filter {
  &__actions {
    display: flex;
    justify-content: space-between;
  }
}
</style>
