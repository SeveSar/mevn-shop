<template>
  <div class="page-orders">
    <OrderSkeleton :count="5" v-if="isLoading" />
    <template v-else-if="!isLoading && orderItems.length">
      <OrdersItem v-for="item in orderItems" :item="item" :key="item._id" />
    </template>
    <span v-else> Заказы не найдены</span>
    <div class="page-orders__pagination" v-if="totalOrders">
      <BasePagination
        :totalCount="totalOrders"
        :perPage="5"
        :current-page="currentPage"
        @change-page="(page) => (currentPage = page)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/api';
import OrdersItem from '../../components/order/OrdersItem.vue';
import OrderSkeleton from '../../components/order/OrderSkeleton.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { onMounted, ref } from 'vue';
import { OrderDTO } from '@/models/order.dto';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const orderItems = ref<OrderDTO[]>([]);
const route = useRoute();
const totalOrders = ref(0);
const currentPage = ref(+route.query.page ?? 1);
const isLoading = ref(true);

const getOrders = async () => {
  try {
    isLoading.value = true;
    const res = await api.order.getOrders({ page: currentPage.value });
    orderItems.value = res.items;
    totalOrders.value = +res.total;
    currentPage.value = +res.currentPage;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getOrders();
});

watch(currentPage, () => {
  getOrders();
});
</script>

<style scoped lang="less">
.page-orders {
  padding-bottom: 50px;
}
</style>
