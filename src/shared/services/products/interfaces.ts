import { IAxiosResponse } from "shared/services/AxiosInterfaces";

import {
  IBodyProduct,
  IBodyProductId,
  IBodyProductList,
} from "shared/types/body/products";

export interface IProductService {
  getProducts: (
    controller?: AbortController
  ) => Promise<IAxiosResponse<IBodyProductList> | void>;
  getProductId: (
    id: number,
    controller?: AbortController
  ) => Promise<IAxiosResponse<IBodyProductId> | void>;
  createProduct: (
    body: IBodyProduct,
    controller?: AbortController
  ) => Promise<IAxiosResponse<IBodyProduct> | void>;
  updateProduct: (
    id: number,
    body: IBodyProduct,
    controller?: AbortController
  ) => Promise<boolean | void>;
  deleteProduct: (
    id: number,
    controller?: AbortController
  ) => Promise<boolean | void>;
}
