import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import AppToast from './components/ui/AppToast.vue';

import './assets/less/main.less';
import 'v-calendar/style.css';

import { useUserStore } from './modules/user/stores/user';

import { useCartStore } from './modules/cart/stores/cart';

const app = createApp(App);
app.use(createPinia());

const cartStore = useCartStore();
const userStore = useUserStore();

const start = async () => {
  try {
    await userStore.auth();
    await cartStore.getCart();
  } catch (e) {
    console.log(e);
  } finally {
    const spinnerAppElem = document.getElementById('app-spinner');
    if (spinnerAppElem) {
      spinnerAppElem.style.display = 'none';
    }
    app.use(router);
    app.mount('#app');
  }
};
start();

export const toaster = createApp(AppToast).mount('#app-toast') as InstanceType<typeof AppToast>;
