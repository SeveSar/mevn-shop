import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import initFire from "@/plugins/firebase";
import "ant-design-vue/dist/antd.css";
import "./assets/less/main.less";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { useProductsStore } from "@/stores/products";
import toastPlugin from "@/plugins/toast";
export const db = getDatabase();
export const dbFireStore = getFirestore(initFire);
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(toastPlugin);
const productsStore = useProductsStore();

productsStore
  .fetchProducts()
  .then(() => {
    app.mount("#app");
  })
  .catch((e) => {
    console.dir(e);
  });
