<template>
  <AppToast />
  <AppModalAuth></AppModalAuth>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLayout from "@/layouts/AppLayout.vue";
import AppToast from "./components/ui/AppToast.vue";
import AppModalAuth from "@/components/modals/auth/ModalAuth.vue";

export default defineComponent({
  components: {
    AppLayout,
    AppToast,
    AppModalAuth,
  },
});
</script>

<style lang="less"></style>
