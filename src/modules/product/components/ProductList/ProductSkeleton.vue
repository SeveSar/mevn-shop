<script setup lang="ts">
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue';

interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 1,
});
</script>

<template>
  <div class="product-skeleton-list">
    <div v-for="n in count" :key="n" class="product-skeleton">
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

<style lang="scss" scoped>
.product-skeleton {
  border-radius: 12px;
  border: 1px solid var(--line-gray, #f0f0f0);
  background: #fff;
  padding: 50px 20px 20px;
  flex: 0 0 calc((100% - 3 * 30px) / 4);

  @media screen and (max-width: $breakpoint-xl) {
    flex: 0 0 calc((100% - 2 * 30px) / 3);
  }
  @media screen and (max-width: $breakpoint-lg) {
    flex: 0 0 calc((100% - 1 * 30px) / 2);
  }
  @media screen and (max-width: $breakpoint-sm) {
    flex: 0 0 100%;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
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
