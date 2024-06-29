<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useProductsStore } from '../../../stores/products';
import BaseSidePanel from '@/components/ui/BaseSidePanel.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

import type { IFilter } from '@/types/IFilter';
import { api } from '@/api/api';

interface Props {
  isOpen: boolean
}
defineProps<Props>();
const emit = defineEmits(['update:isOpen']);

const productsStore = useProductsStore();

const selectedFilters = ref<string[]>([]);
const lastAcceptedFilters = ref<string[]>([]);
const filtersRes = ref<IFilter[] | null>(null);
const isLoading = ref(false);

function isActiveFilter(value: string) {
  return selectedFilters.value.includes(value);
}

function filterProducts() {
  lastAcceptedFilters.value = [...selectedFilters.value];
  productsStore.getProducts(selectedFilters.value);
}

async function resetFilterProducts() {
  selectedFilters.value = [];
  lastAcceptedFilters.value = [];
  await productsStore.getProducts();
}

async function fetchFilters() {
  try {
    isLoading.value = true;
    filtersRes.value = await api.product.fetchProductFilters();
  }
  catch (e) {
  }
  finally {
    isLoading.value = false;
  }
}

function onClose() {
  emit('update:isOpen', false);
  selectedFilters.value = [...lastAcceptedFilters.value];
}
fetchFilters();
</script>

<template>
  <BaseSidePanel
    :is-open="isOpen"
    class="panel-product-filter"
    title="Фильтры"
    @close="onClose"
    @show="emit('update:isOpen', true)"
  >
    <template #default>
      <div v-if="!isLoading && filtersRes" class="panel-product-filter__list">
        <div v-for="filter in filtersRes" :key="filter.id" class="panel-product-filter__block">
          <div class="panel-product-filter__block-title">
            {{ filter.title }}
          </div>
          <div class="panel-product-filter__items">
            <label
              v-for="value in filter.items"
              :key="value.id"
              class="panel-product-filter__item"
              :class="{
                'panel-product-filter__item--active': isActiveFilter(value.id),
              }"
            >
              {{ value.title }}

              <input
                v-model="selectedFilters"
                type="checkbox"
                :value="value.id"
                name="filter"
                class="panel-product-filter__control"
              >
            </label>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="panel-product-filter__actions">
        <BaseButton variant="border" :disabled="!lastAcceptedFilters.length" @click="resetFilterProducts">
          Сбросить
        </BaseButton>
        <BaseButton :is-loading="productsStore.isLoading" @click="filterProducts">
          Применить
        </BaseButton>
      </div>
    </template>
  </BaseSidePanel>
</template>

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
