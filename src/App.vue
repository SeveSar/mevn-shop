<script lang="ts" setup>
import AppLayout from '@/layouts/AppLayout.vue';
import { ModalAuth, useAuthModalStore } from '@/modules/user';
import { watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import 'pizza-mevn-ui-kit/styles';

const modalStore = useAuthModalStore();
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

<style lang="scss">
html {
  color-scheme: light;
}
</style>
