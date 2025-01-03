import type { AppLayoutsEnum } from '@/layouts/layouts.types';
import type { Component } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: Component
    isAuth?: boolean
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
