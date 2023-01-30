import { ref, watch } from "vue";
import type { IToast, TypeToast } from "./plugins.types";

export default {
  install: (app: any, options: any) => {
    // inject a globally available $translate() method
    const toasts = ref<IToast[]>([]);
    let id = 0;
    const showToast = (toast: { type: TypeToast; text: string }) => {
      id++;
      const newToast = {
        ...toast,
        id,
      } as IToast;
      toasts.value.unshift(newToast);

      setTimeout(() => {
        removeToast(newToast.id || 0);
      }, 3000);
    };
    watch(toasts, (val) => console.log(val));
    const removeToast = (id: number) => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
      id--;
    };
    app.provide("showToast", showToast);
    app.provide("hideToast", removeToast);
    app.provide("toasts", toasts);
  },
};
