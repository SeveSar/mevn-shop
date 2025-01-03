<script lang="ts">
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = withDefaults(defineProps<Props>(), {
  offset: 4,
});

const emits = defineEmits(['changePage']);

interface Props {
  perPage: number
  totalCount: number
  currentPage: number
  offset?: number
}

const router = useRouter();

const totalPages = computed(() => {
  return Math.ceil(props.totalCount / props.perPage);
});

const serializedPages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      (props.currentPage - i < props.offset && props.currentPage - i > -props.offset)
      || i === totalPages.value
      || i === 1
    ) {
      pages.push(i);
    }
  }

  return pages;
});

function changePage(page: number) {
  router.push({ query: { page: page.toString() } });
  emits('changePage', page);
}
</script>

<template>
  <ul class="base-pagination">
    <li
      class="base-pagination__item base-pagination__item--arrow"
      :class="{ 'base-pagination__item--disabled': currentPage <= 1 }"
      @click="changePage(currentPage - 1)"
    >
      {{ '<' }}
    </li>
    <li
      v-for="(page) in serializedPages"
      :key="page"
      class="base-pagination__item"
      :class="{ 'base-pagination__item--active': currentPage === page }"
      @click.prevent="changePage(page)"
    >
      {{ page }}
    </li>
    <li
      class="base-pagination__item base-pagination__item--arrow"
      :class="{ 'base-pagination__item--disabled': currentPage >= totalPages }"
      @click="changePage(currentPage + 1)"
    >
      {{ '>' }}
    </li>
  </ul>
</template>

<style lang="less" scoped>
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  list-style: none;

  &__item {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:;
    border: 1px solid @gray-color;
    color: @black-color;
    font-size: 16px;
    margin: 0 5px;

    &--active {
      pointer-events: none;
      background-color: @main-color;
      color: @white-color;
    }

    &--arrow {
      background-color: @main-color;
      color: @white-color;
    }

    &--disabled {
      pointer-events: none;
    }
  }
}
</style>
