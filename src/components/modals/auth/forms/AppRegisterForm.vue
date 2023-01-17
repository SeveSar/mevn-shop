<template>
  <VForm
    title-form="Зарегестрируйтесь"
    button-text="Создать аккаунт"
    @submitForm="onSubmit"
  />
</template>

<script setup lang="ts">
import VForm from "@/components/VForm/VForm.vue";
import type DataFormControls from "@/types/DataFormControls";
import { useUserStore } from "@/stores/user";
import { errorHandler } from "@/utils/errorHandler";
import { inject } from "vue";
import type { IToast } from "@/plugins/plugins.types";

//state
const userStore = useUserStore();
const showToast = inject("showToast") as (message: IToast) => void;

const onSubmit = async ({ email, password }: DataFormControls) => {
  try {
    await userStore.signUp(email, password);
  } catch (e) {
    const message = errorHandler(e) || "Unknown";
    showToast({ type: "error", text: message });
  }
};
</script>

<style scoped></style>
