import instance from "./instances";
import AuthService from "./services/auth";
import ProductServices from "./services/products";
import axios from "axios";

interface Api {
  auth: AuthService;
  product: ProductServices;
}

export const api: Api = {
  auth: new AuthService(instance, axios),
  product: new ProductServices(axios),
};
