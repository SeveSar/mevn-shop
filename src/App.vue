<template>
  <AppToast />
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLayout from "@/layouts/AppLayout.vue";
import AppToast from "./components/ui/AppToast.vue";
export default defineComponent({
  components: {
    AppLayout,
    AppToast,
  },
});
</script>

<style lang="less"></style>
