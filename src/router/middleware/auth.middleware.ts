import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useUserStore } from "@/stores/user";

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const requiredAuth = to.matched.some((record) => record.meta.isAuth);
  const isLoggedIn = useUserStore().isLoggedIn;
  if (requiredAuth && !isLoggedIn) next("/?msg=NOT_AUTH");
  next();
}
