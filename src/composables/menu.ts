import { useUserStore } from '@/modules/user/stores/user';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouteNamesEnum } from './../router/router.types';

const menuLinks = [
  { title: 'Пицца', active: true },
  { title: 'Суши', active: false },
  { title: 'Напитки', active: false },
  { title: 'Закуски', active: false },
  { title: 'Комбо', active: false },
  { title: 'Десерты', active: false },
  { title: 'Соусы', active: false },
];

const isOpenedBurger = ref<boolean>(false);

export function useMenu() {
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const logOut = () => {
    userStore.logOut();
    router.push({ name: RouteNamesEnum.products });
  };

  watch(
    () => route.query,
    () => {
      isOpenedBurger.value = false;
    },
  );
  return {
    isOpenedBurger,
    menuLinks,
    logOut,
  };
}
