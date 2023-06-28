<template>
  <AppToast />
  <Teleport to="body">
    <ModalAuth />
    <ModalProduct :is-open="modalStore.isModalProduct" />
  </Teleport>

  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import AppToast from './components/ui/AppToast.vue';
import ModalProduct from './components/modals/ModalProduct/ModalProduct.vue';
import ModalAuth from './modules/user/components/modals/ModalAuth/ModalAuth.vue';

import { useModalStore } from './stores/modal';

const modalStore = useModalStore();
</script>

<style lang="less"></style>
