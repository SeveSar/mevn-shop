<script lang="ts" setup>
import TheHeader from '@/components/layouts/TheHeader/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="container">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
