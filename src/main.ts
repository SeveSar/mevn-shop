import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import initFire from '@/plugins/firebase';

import './assets/less/main.less';

import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

import { useUserStore } from './modules/user/stores/user';

import { useCartStore } from './modules/cart/stores/cart';
export const db = getDatabase();
export const dbFireStore = getFirestore(initFire);
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
