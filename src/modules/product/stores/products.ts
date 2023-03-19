import { defineStore } from "pinia";
import { api } from "@/api/api";
import type { ProductItem } from "@/types/ProductItem";
import type { IProduct } from "@/models/IProduct";

interface ProductsState {
  products: Array<IProduct>;
}

export const useProductsStore = defineStore({
  id: "products",
  state: () =>
    ({
      products: [],
    } as ProductsState),
  getters: {
    getProductById(state) {
      return function (id: number | string): IProduct | undefined {
        return state.products.find((item) => item.id === id);
      };
    },
  },
  actions: {
    async getProducts(filters: string[]) {
      const dataProducts = await api.product.fetchProducts(filters);

      if (dataProducts) {
        this.products = dataProducts;
      }
    },

    // changeSizeProduct(idProduct: number | string, idSize: number | string) {
    //   const product = this.getItemById(idProduct);
    //   if (!product) return;
    //   const productSize = product.sizes?.find((item) => item.id === idSize);
    //   product.sizes?.forEach((item) => (item.active = false));
    //   if (productSize) {
    //     productSize.active = true;
    //     product.price = productSize.price;
    //   }
    // },
  },
});
