<template>
  <div class="page-orders">
    <ProfileOrdersItem />
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/api';
import ProfileOrdersItem from '../../components/ProfileOrdersItem.vue';
import { onMounted } from 'vue';

onMounted(async () => {
  const data = await api.order.getOrders();
  console.log(data, 'data');
});
</script>

<style scoped lang="less"></style>
