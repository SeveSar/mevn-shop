import type { RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/modules/user/stores/user';

export async function authMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const requiredAuth = to.matched.some((record) => record.meta.isAuth);

  const isLoggedIn = useUserStore().isLoggedIn;

  if (requiredAuth && !isLoggedIn) {
    return { name: 'Login' };
  } else if (!requiredAuth && isLoggedIn) {
    return { name: 'Products' };
  }
}
