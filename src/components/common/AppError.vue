<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Ошибка 404. Страница не найдена',
    },
  },
});
</script>

<template>
  <div class="error">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.error {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
