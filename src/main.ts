import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import AppToast from './components/ui/AppToast.vue';

import './assets/less/main.less';

import { useUserStore } from '@/modules/user/stores/user';

import { useCartStore } from '@/modules/cart/stores';

const app = createApp(App);
app.use(createPinia());

const cartStore = useCartStore();
const userStore = useUserStore();

async function start() {
  try {
    await userStore.auth();

    await cartStore.getCart();
  }
  catch (e) {
    console.error(e);
  }
  finally {
    const spinnerAppElem = document.getElementById('app-spinner');
    if (spinnerAppElem) {
      spinnerAppElem.style.display = 'none';
    }
    app.use(router);
    app.mount('#app');
  }
}
start();

export const toaster = createApp(AppToast).mount('#app-toast') as InstanceType<typeof AppToast>;
