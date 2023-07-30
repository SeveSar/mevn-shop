<template>
  <div class="modal-product-tabs">
    <template v-if="!isLoading">
      <div class="modal-product-tabs__dough">
        <BaseTab
          class="modal-product-tabs__tab-dough"
          v-if="selectedTabDoughModel"
          v-model="selectedTabDoughModel"
          :items="doughs || []"
        />
      </div>
      <div class="modal-product-tabs__sizes">
        <BaseTab
          class="modal-product-tabs__tab-size"
          v-if="selectedTabSizeModel"
          v-model="selectedTabSizeModel"
          size="small"
          :items="sizes || []"
        />
      </div>
    </template>
    <template v-else>
      <div class="modal-product-tabs__skeletons">
        <BaseSkeleton width="100%" height="48px" corner="6" />
      </div>
      <div class="modal-product-tabs__skeletons">
        <BaseSkeleton width="100%" height="48px" corner="6" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IDoughItem, ISizeItem } from '@/types/IProduct';

import BaseTab from '@/components/ui/BaseTab.vue';
import { ISelectedTabDough, ISelectedTabSize } from './ModalProduct.vue';
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue';
import { computed } from 'vue';

interface Props {
  selectedTabDough: ISelectedTabDough | null;
  selectedTabSize: ISelectedTabSize | null;
  doughs: IDoughItem[];
  sizes: ISizeItem[];
  isLoading: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:selectedTabSize', 'update:selectedTabDough']);

const selectedTabSizeModel = computed({
  get() {
    return props.selectedTabSize;
  },
  set(value) {
    emit('update:selectedTabSize', value);
  },
});

const selectedTabDoughModel = computed({
  get() {
    return props.selectedTabDough;
  },
  set(value) {
    emit('update:selectedTabDough', value);
  },
});
</script>

<style scoped lang="less">
.modal-product-tabs {
  &__tab-dough,
  &__tab-size {
    border: 1px solid @gray-color;
    border-radius: 6px;
  }

  &__tab-size {
    &:deep(.base-tab__tab) {
      width: calc(100% / 3);
      flex-grow: 1;
    }
  }

  &__tab-dough {
    margin-bottom: 16px;

    &:deep(.base-tab__tab) {
      width: calc(100% / 2);
      flex-grow: 1;
    }
  }

  &__skeletons {
    margin: 8px 0;
  }
}
</style>
