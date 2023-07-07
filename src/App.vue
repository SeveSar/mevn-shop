<template>
  <Teleport to="body">
    <ModalAuth />
  </Teleport>

  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';

import ModalAuth from './modules/user/components/modals/ModalAuth/ModalAuth.vue';

import { useModalStore } from './stores/modal';

const modalStore = useModalStore();
</script>

<style lang="less"></style>
