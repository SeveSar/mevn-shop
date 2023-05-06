import { instance } from "./axios/instances";
import { AxiosHttpClient } from "./axios";
import AuthService from "@/modules/user/services/auth";
import ProductServices from "@/modules/product/services/products";
import axios from "axios";
import { FilesServices } from "./services/files";

const axiosHttpClient = new AxiosHttpClient(instance);

interface Api {
  auth: AuthService;
  product: ProductServices;
  files: FilesServices;
}

export const api: Api = {
  auth: new AuthService(axiosHttpClient, axios),
  product: new ProductServices(axiosHttpClient),
  files: new FilesServices(axiosHttpClient),
};
