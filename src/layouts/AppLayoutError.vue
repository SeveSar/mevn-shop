<template>
  <TheHeader></TheHeader>
  <main class="main">
    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/layouts/TheHeader/TheHeader.vue';
</script>
<style lang="less" scoped></style>
