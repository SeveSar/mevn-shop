import type { VueElement } from 'vue';
import type { AppLayoutsEnum } from '@/layouts/layouts.types';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
    isAuth?: boolean;
  }
}

export enum RouteNamesEnum {
  products = 'Products',
  cart = 'Cart',
  admin = 'Admin',
  profile = 'Profile',
  settings = 'Settings',
  orders = 'Orders',
}
