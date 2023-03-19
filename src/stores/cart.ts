import { defineStore } from "pinia";

import { useUserStore } from "@/stores/user";

import { useModalStore } from "@/stores/modal";
import type { ICart } from "@/models/ICart";
import { useProductsStore } from "../modules/product/stores/products";

interface cartStore {
  cart: ICart[];
  inProccess: string[];
}

export const useCartStore = defineStore({
  id: "cart",
  state: () =>
    ({
      cart: [],
      inProccess: [],
    } as cartStore),
  getters: {
    getIndex() {
      return (id: string): number =>
        this.cart.findIndex((item) => item.id === id);
    },

    inCart() {
      return (id: string) => {
        return this.getIndex(id) !== -1;
      };
    },

    inProccessing() {
      return (id: string): boolean => this.inProccess.includes(id);
    },

    getItem() {
      return (id: string) => this.cart.find((item) => item.id === id);
    },

    canAdd() {
      return (id: string) => !this.inProccessing(id) && !this.inCart(id);
    },

    canDel() {
      return (id: string) => !this.inProccessing(id) && this.inCart(id);
    },

    canUpdate() {
      return (id: string) => !this.inProccessing(id) && this.inCart(id);
    },

    totalPrice(): number {
      return this.cart.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
    },

    totalItems(): number {
      return this.cart.reduce((acc, item) => {
        return (acc += item.cnt);
      }, 0);
    },
  },
  actions: {
    async addToCart(id: string) {
      if (!useUserStore().isLoggedIn) {
        useModalStore().openLoginModal();
        return false;
      }

      const productsStore = useProductsStore();

      const cartItem = productsStore.getItemById(id);
      if (this.canAdd(id) && cartItem) {
        this.inProccess.push(id);
        const newItem = {
          ...cartItem,
          cnt: 1,
        } as ICart;
        this.cart.push(newItem);

        // await addtoCart(newItem, useUserStore().user.id ?? "");
        this.inProccess = this.inProccess.filter((id) => id !== id);
      }
    },

    async updateCnt(id: string, newCnt: number) {
      if (this.canUpdate(id)) {
        this.inProccess.push(id);
        const itemCart = this.getItem(id);
        if (!itemCart) return false;
        itemCart.cnt = Math.max(1, newCnt);
        const standartSize = itemCart.sizes?.find((item) => item.active);
        if (standartSize) {
          itemCart.price = itemCart.cnt * standartSize?.price;
        }
        // await saveCart(this.cart, useUserStore().user.id ?? "");
        this.inProccess = this.inProccess.filter((itemId) => itemId !== id);
      }
    },

    async delFromCart(id: string) {
      if (this.canDel(id)) {
        this.inProccess.push(id);
        this.cart = this.cart.filter((pr) => pr.id !== id);
        // await saveCart(this.cart, useUserStore().user.id ?? "");
        this.inProccess = this.inProccess.filter((itemId) => itemId !== id);
      }
    },

    saveCart(cart: ICart[]) {
      this.cart = cart;
    },

    async clearCart() {
      this.cart = [];
      // await saveCart(this.cart, useUserStore().user.id ?? "");
    },
  },
});
