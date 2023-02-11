<template>
  <AppToast />
  <ModalAuth></ModalAuth>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLayout from "@/layouts/AppLayout.vue";
import AppToast from "./components/ui/AppToast.vue";
import ModalAuth from "./modules/user/components/modals/ModalAuth/ModalAuth.vue";

export default defineComponent({
  components: {
    AppLayout,
    AppToast,
    ModalAuth,
  },
});
</script>

<style lang="less"></style>
