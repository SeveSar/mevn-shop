<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

import { ModalAuth, useAuthModal } from '@/modules/user';
import AppLayout from '@/layouts/AppLayout.vue';

const modalStore = useAuthModal();
const route = useRoute();

const router = useRouter();

watch(
  () => route.query.requireAuth,
  (val) => {
    if (val) {
      modalStore.openAuthModal();
      router.replace({ query: {} });
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <ModalAuth />
  </Teleport>

  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<style lang="less">
html {
  color-scheme: light;
}
</style>
