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
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const modalStore = useModalStore();
const route = useRoute();

watch(route, () => {
  console.log(route, 'route');
});
</script>

<style lang="less">
html {
  color-scheme: light;
}
</style>
