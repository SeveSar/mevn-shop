import { createRouter, createWebHistory } from "vue-router";
import ErrorPage from "@/views/PageError/PageError.vue";
import { loadLayoutMiddleware } from "./middleware/loadLayout.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import { AppLayoutsEnum } from "@/layouts/layouts.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/product/views/PageProducts/PageIndex.vue"),
      alias: ["/products"],
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../admin/views/PageAdmin/PageAdmin.vue"),
      children: [
        {
          name: "Pizza",
          path: "",
          component: () => import("../admin/views/CreatePizza/CreatePizza.vue"),
        },
        {
          name: "Goods",
          path: "goods",
          component: () => import("@/admin/views/CreateGoods/CreateGoods.vue"),
        },
      ],
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/cart/views/PageCart/PageCart.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/order-done",
      name: "Order",
      component: () => import("@/order/views/PageOrder/PageOrder.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("@/profile/views/PageProfile/PageProfile.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      name: "Product",
      path: "/products/:id",
      component: () => import("@/product/views/_PageProduct/_PageProduct.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: ErrorPage,
      meta: {
        layout: AppLayoutsEnum.error,
      },
    },
  ],
});

router.beforeEach(loadLayoutMiddleware);
router.beforeEach(authMiddleware);
export default router;
