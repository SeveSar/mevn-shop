<template>
  <div class="page-orders">
    <OrderSkeleton :count="5" v-if="isLoading" />
    <template v-else-if="!isLoading && orderItems.length">
      <OrdersItem v-for="item in orderItems" :item="item" :key="item._id" />
    </template>
    <span v-else> Заказы не найдены</span>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/api';
import OrdersItem from '../../components/order/OrdersItem.vue';
import OrderSkeleton from '../../components/order/OrderSkeleton.vue';

import { onMounted, ref } from 'vue';
import { OrderDTO } from '@/models/order.dto';
import { computed } from 'vue';

const orderItems = ref<OrderDTO[]>([]);
const totalOrders = ref(0);
const currentPage = ref(1);
const isLoading = ref(true);
onMounted(async () => {
  try {
    isLoading.value = true;
    const res = await api.order.getOrders();
    orderItems.value = res.items;
    totalOrders.value = res.total;
    currentPage.value = res.currentPage;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="less"></style>
