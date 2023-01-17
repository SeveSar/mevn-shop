<template>
  <VForm @submit-form="onSubmit" />
</template>

<script setup lang="ts">
import VForm from "@/components/VForm/VForm.vue";
import type DataFormControls from "@/types/DataFormControls";
import { useUserStore } from "@/stores/user";
import { inject } from "vue";
import type { IToast } from "@/plugins/plugins.types";
import { errorHandler } from "@/utils/errorHandler";

const showToast = inject("showToast") as (message: IToast) => void;
const userStore = useUserStore();
const onSubmit = async (data: DataFormControls) => {
  try {
    await userStore.login(data.email, data.password);
  } catch (e) {
    const message = errorHandler(e) || "Unknown";
    showToast({ type: "error", text: message });
  }
};
</script>

<style scoped></style>
