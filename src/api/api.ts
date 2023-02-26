import instance from "./instances";
import AuthService from "@/modules/user/services/auth";
import ProductServices from "@/modules/product/services/products";
import axios from "axios";
import { FilesServices } from "./services/files";

interface Api {
  auth: AuthService;
  product: ProductServices;
  files: FilesServices;
}

export const api: Api = {
  auth: new AuthService(instance, axios),
  product: new ProductServices(instance, axios),
  files: new FilesServices(instance),
};
