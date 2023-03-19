<template>
  <BaseSidePanel
    :isOpen="modelValue"
    @close="$emit('update:modelValue', false)"
    @show="$emit('update:modelValue', true)"
    class="panel-product-filter"
  >
    <template #header>
      <h3 class="panel-product-filter__title">Фильтры</h3>
    </template>
    <template #default>
      <div class="panel-product-filter__list">
        <div
          class="panel-product-filter__block"
          v-for="filter in filters"
          :key="filter.id"
        >
          <div class="panel-product-filter__block-title">
            {{ filter.title }}
          </div>
          <div class="panel-product-filter__items">
            <label
              class="panel-product-filter__item"
              :class="{
                'panel-product-filter__item--active': isActiveFilter(value._id),
              }"
              v-for="value in filter.items"
              :key="value.id"
            >
              {{ value.title }}
              <input
                type="checkbox"
                v-model="selectedFilters"
                :value="value._id"
                name="filter"
                class="panel-product-filter__control"
              />
            </label>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="panel-product-filter__actions">
        <BaseButton variant="border" @click="resetFilterProducts"
          >Сбросить</BaseButton
        >
        <BaseButton @click="filterProducts">Применить</BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import BaseSidePanel from "@/components/ui/BaseSidePanel.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useProductsStore } from "../../../stores/products";

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
    const productsStore = useProductsStore();

    const selectedFilters = ref<string[]>([]);

    const isActiveFilter = (value: string) => {
      return selectedFilters.value.includes(value);
    };

    const filterProducts = () => {
      productsStore.getProducts(selectedFilters.value);
    };

    const resetFilterProducts = () => {
      selectedFilters.value = [];
      productsStore.getProducts();
    };
    return {
      selectedFilters,
      isActiveFilter,
      filterProducts,
      resetFilterProducts,
    };
  },
});
</script>

<style scoped lang="less">
.panel-product-filter {
  &__title {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: @black-color;
  }
  &__block {
    &:not(:last-child) {
      margin-bottom: 24px;
    }

    &-title {
      color: @gray2-color;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 12px;
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__item {
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @black-color;
    padding: 5px 16px;
    min-height: 40px;
    border: 1px solid @gray-color;
    border-radius: 6px;

    &--active {
      color: @white-color;
      background-color: @main-color;
    }
  }

  &__control {
    display: none;
  }
}
</style>
