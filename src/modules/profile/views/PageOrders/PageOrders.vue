<script setup lang="ts">
import type { OrderDTO } from '@/models/order.dto';
import { api } from '@/api/api';
import BasePagination from '@/components/ui/BasePagination.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import OrdersItem from '../../components/order/OrdersItem.vue';
import OrderSkeleton from '../../components/order/OrderSkeleton.vue';

const orderItems = ref<OrderDTO[]>([]);
const route = useRoute();
const totalOrders = ref(0);
const currentPage = ref(route.query.page ? +route.query.page : 1);
const isLoading = ref(true);

async function getOrders() {
  try {
    isLoading.value = true;
    const res = await api.order.getOrders({ page: currentPage.value });
    orderItems.value = res.items;
    totalOrders.value = +res.total;
    currentPage.value = +res.currentPage;
  }
  catch (e) {
    console.error(e);
  }
  finally {
    isLoading.value = false;
  }
}
onMounted(() => {
  getOrders();
});

watch(currentPage, () => {
  getOrders();
});
</script>

<template>
  <div class="page-orders">
    <OrderSkeleton v-if="isLoading" :count="5" />
    <template v-else-if="!isLoading && orderItems.length">
      <OrdersItem v-for="item in orderItems" :key="item._id" :item="item" />
      <div v-if="currentPage > 1" class="page-orders__pagination">
        <BasePagination
          :total-count="totalOrders" :per-page="5" :current-page="currentPage"
          @change-page="(page) => (currentPage = page)"
        />
      </div>
    </template>

    <span v-else> Заказы не найдены</span>
  </div>
</template>

<style scoped lang="scss">
.page-orders {
  padding-bottom: 50px;
}
</style>
