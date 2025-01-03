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
  <div class="order-skeletons">
    <div v-for="i in count" :key="i" class="order-skeletons__item order-skeletons-item">
      <div class="order-skeletons-item__header">
        <BaseSkeleton width="100" height="40" corner="5" />
        <BaseSkeleton width="100" height="40" corner="5" />
        <BaseSkeleton width="100" height="40" corner="5" />
        <BaseSkeleton width="100" height="40" corner="5" />
      </div>
      <div class="order-skeletons-item__extra">
        <BaseSkeleton width="70%" height="12" corner="3" />
        <div class="order-skeletons-item__images">
          <BaseSkeleton class="order-skeletons-item__images-item" width="40" height="40" corner="100" />
          <BaseSkeleton class="order-skeletons-item__images-item" width="40" height="40" corner="100" />
          <BaseSkeleton class="order-skeletons-item__images-item" width="40" height="40" corner="100" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.order-skeletons {
  &__item {
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    background: #ffffff;
    margin-bottom: 50px;
  }

  &-item {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @gray-color;
      padding-bottom: 16px;
      margin-bottom: 22px;
    }

    &__extra {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__images {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 7px;
    }
  }
}
</style>
