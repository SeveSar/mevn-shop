<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  emits: ['clickFilter'],
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="product-block">
    <div class="product-block__header">
      <h2 class="product-block__title">
        Пицца
      </h2>
      <button class="product-block__filter" @click="$emit('clickFilter')">
        Фильтры
      </button>
    </div>
    <div class="product-block__body">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-block {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    justify-content: space-between;
  }
}
</style>
