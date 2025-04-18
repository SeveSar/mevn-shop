import { useUserStore } from '@/modules/user/stores/user';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';

import AppToast from './components/ui/AppToast.vue';

import router from './router';

import './assets/scss/main.scss';

const app = createApp(App);
app.use(createPinia());

const userStore = useUserStore();

async function start() {
  try {
    await userStore.auth();
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
