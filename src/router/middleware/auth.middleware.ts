import type { LocationQuery, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/modules/user/stores/user';

export function authMiddleware(to: RouteLocationNormalized) {
  const requiredAuth = to.matched.some(record => record.meta.isAuth);
  const isLoggedIn = useUserStore().isLoggedIn;

  if (requiredAuth && !isLoggedIn) {
    return { name: 'Login', query: { ...to.query, requiresAuth: true } as LocationQuery & { requiresAuth: boolean } };
  }
  else if (!requiredAuth && isLoggedIn) {
    return true;
  }
}
