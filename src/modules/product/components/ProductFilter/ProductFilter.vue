<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="product-filter">
    <div class="product-filter__section" />
  </div>
</template>

<style scoped lang="scss">
.filter {
  overflow-x: auto;
  margin: 0 -16px;
  &__inner {
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
}
.button {
  margin-right: 10px;
}
</style>
