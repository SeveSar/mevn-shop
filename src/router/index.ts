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
      alias: ["/products"],
      component: () =>
        import("@/modules/product/views/PageProducts/PageProducts.vue"),
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("@/modules/admin/views/PageAdmin/PageAdmin.vue"),
      children: [
        {
          name: "Pizza",
          path: "",
          component: import(
            "@/modules/admin/views/CreatePizza/CreatePizza.vue"
          ),
        },
        {
          name: "Goods",
          path: "goods",
          component: () =>
            import("@/modules/admin/views/CreateGoods/CreateGoods.vue"),
        },
      ],
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/modules/cart/views/PageCart/PageCart.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/order-done",
      name: "Order",
      component: () => import("@/modules/order/views/PageOrder/PageOrder.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () =>
        import("@/modules/profile/views/PageProfile/PageProfile.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      name: "Product",
      path: "/products/:id",
      component: () =>
        import("@/modules/product/views/PageProduct/PageProduct.vue"),
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
