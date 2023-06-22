<template>
  <AppToast />
  <Teleport to="body">
    <ModalAuth />
    <ModalProduct :is-open="modalStore.isModalProduct" />
  </Teleport>

  <AppLayout v-if="!loading">
    <router-view />
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import AppToast from './components/ui/AppToast.vue';
import ModalProduct from './components/modals/ModalProduct/ModalProduct.vue';
import ModalAuth from './modules/user/components/modals/ModalAuth/ModalAuth.vue';

import { useModalStore } from './stores/modal';

import { ref } from 'vue';
const modalStore = useModalStore();

const loading = ref(false);
</script>

<style lang="less"></style>
