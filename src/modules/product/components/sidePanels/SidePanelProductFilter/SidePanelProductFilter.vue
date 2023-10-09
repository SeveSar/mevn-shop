<template>
  <BaseSidePanel
    :isOpen="isOpen"
    @close="onClose"
    @show="emit('update:isOpen', true)"
    class="panel-product-filter"
    title="Фильтры"
  >
    <template #default>
      <div class="panel-product-filter__list" v-if="!isLoading && filtersRes">
        <div class="panel-product-filter__block" v-for="filter in filtersRes" :key="filter.id">
          <div class="panel-product-filter__block-title">
            {{ filter.title }}
          </div>
          <div class="panel-product-filter__items">
            <label
              class="panel-product-filter__item"
              :class="{
                'panel-product-filter__item--active': isActiveFilter(value.id),
              }"
              v-for="value in filter.items"
              :key="value.id"
            >
              {{ value.title }}

              <input
                type="checkbox"
                v-model="selectedFilters"
                :value="value.id"
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
        <BaseButton variant="border" @click="resetFilterProducts" :disabled="!lastAcceptedFilters.length"
          >Сбросить</BaseButton
        >
        <BaseButton @click="filterProducts" :isLoading="productsStore.isLoading">Применить</BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import BaseSidePanel from '@/components/ui/BaseSidePanel.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useProductsStore } from '../../../stores/products';

import type { IFilter } from '@/types/IFilter';
import { api } from '@/api/api';

interface Props {
  isOpen: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:isOpen']);

const productsStore = useProductsStore();

const selectedFilters = ref<string[]>([]);
const lastAcceptedFilters = ref<string[]>([]);
const filtersRes = ref<IFilter[] | null>(null);
const isLoading = ref(false);

const isActiveFilter = (value: string) => {
  return selectedFilters.value.includes(value);
};

const filterProducts = () => {
  lastAcceptedFilters.value = [...selectedFilters.value];
  productsStore.getProducts(selectedFilters.value);
};

const resetFilterProducts = async () => {
  selectedFilters.value = [];
  lastAcceptedFilters.value = [];
  await productsStore.getProducts();
};

const fetchFilters = async () => {
  try {
    isLoading.value = true;
    filtersRes.value = await api.product.fetchProductFilters();
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

const onClose = () => {
  emit('update:isOpen', false);
  selectedFilters.value = [...lastAcceptedFilters.value];
};
fetchFilters();
</script>

<style scoped lang="less">
.panel-product-filter {
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
