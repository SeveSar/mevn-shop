<template>
  <AppToast />
  <Teleport to="body">
    <ModalAuth />
  </Teleport>
  <ModalProduct :is-open="modalStore.isModalProduct" />
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLayout from "@/layouts/AppLayout.vue";
import AppToast from "./components/ui/AppToast.vue";
import ModalProduct from "./components/modals/ModalProduct/ModalProduct.vue";
import ModalAuth from "./modules/user/components/modals/ModalAuth/ModalAuth.vue";

import { useModalStore } from "./stores/modal";

export default defineComponent({
  components: {
    AppLayout,
    AppToast,
    ModalAuth,
    ModalProduct,
  },

  setup() {
    const modalStore = useModalStore();
    return {
      modalStore,
    };
  },
});
</script>

<style lang="less"></style>
