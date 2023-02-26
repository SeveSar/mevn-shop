import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/layouts/layouts.types";

export interface IRoutesNames {
  home: string;
}

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
    isAuth: boolean;
  }
}

export enum RouteNamesEnum {
  home = "Home",
  cart = "Cart",
  admin = "Admin",
}
