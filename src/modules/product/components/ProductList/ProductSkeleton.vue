<template>
  <div class="product-skeleton-list">
    <div class="product-skeleton" v-for="n in count" :key="n">
      <div class="product-skeleton__img">
        <BaseSkeleton class="product-skeleton__img-img" width="170" height="170" corner="50%" />
      </div>
      <div class="product-skeleton__body">
        <BaseSkeleton class="product-skeleton__title" width="55%" height="23" corner="6" />
        <BaseSkeleton width="100%" height="50" corner="6" />
      </div>
      <div class="product-skeleton__footer">
        <BaseSkeleton width="131" height="48" corner="6" />
        <BaseSkeleton width="78" height="24" corner="6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue';

interface Props {
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 1,
});
</script>

<style lang="less" scoped>
.product-skeleton {
  border-radius: 12px;
  border: 1px solid var(--line-gray, #f0f0f0);
  background: #fff;
  padding: 50px 20px 20px;
  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 35px;
  }

  &__img {
    margin-bottom: 25px;
    &-img {
      margin: auto;
    }
  }

  &__title {
    margin-bottom: 15px;
  }
}
</style>
