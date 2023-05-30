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

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

import AppLayout from "@/layouts/AppLayout.vue";
import AppToast from "./components/ui/AppToast.vue";
import ModalProduct from "./components/modals/ModalProduct/ModalProduct.vue";
import ModalAuth from "./modules/user/components/modals/ModalAuth/ModalAuth.vue";
import BaseCheckBox from "./components/ui/BaseCheckBox.vue";
import RecorderRTC from "recordrtc";

import { onMounted } from "vue";

import { useModalStore } from "./stores/modal";
const modalStore = useModalStore();
</script>

<style lang="less"></style>
