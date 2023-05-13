import { ref } from "vue";
import { defineStore } from "pinia";
import type { IToast, TypeToast } from "@/plugins/plugins.types";

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<IToast[]>([]);
  let id = 0;
  const showToast = (toast: { type: TypeToast; text: string }) => {
    id++;
    const newToast = {
      ...toast,
      id,
    } as IToast;
    toasts.value.push(newToast);
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
    id--;
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
});
