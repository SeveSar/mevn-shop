import type { AxiosInstance } from "axios";
import type { IProduct, IProductDTO } from "../../../models/IProduct";

export default class ProductServices {
  private readonly $axios: AxiosInstance;
  private readonly $http: AxiosInstance;

  constructor($http: AxiosInstance, $axios: AxiosInstance) {
    this.$axios = $axios;
    this.$http = $http;
  }

  async fetchProducts(filters: string[]) {
    let res;
    if (filters && filters.length) {
      res = await this.$http.get<IProductDTO[]>("/products", {
        params: { filters },
      });
    } else {
      res = await this.$http.get<IProductDTO[]>("/products");
    }

    return res.data.map((productDTO) => {
      return {
        ...productDTO,
        sizes: productDTO.sizes.map((size) => {
          return {
            ...size,
            id: size._id,
          };
        }),
        dough: productDTO.dough.map((dough) => {
          return {
            ...dough,
            id: dough._id,
          };
        }),
        ingredients: productDTO.ingredients.map((item) => {
          return {
            ...item,
            id: item._id,
            img: import.meta.env.VITE_BASE_URL + "/" + item.img,
            isActive: false,
          };
        }),
      };
    }) as IProduct[];
  }

  async fetchProductFilters() {
    const res = await this.$http.get("/filter");
    return res.data;
  }

  async createProduct(productData: IProductDTO) {
    const res = await this.$http.post<IProductDTO>("/products", productData);
    return res.data;
  }
}
