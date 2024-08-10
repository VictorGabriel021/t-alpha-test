import { IAxiosResponse } from "shared/services/AxiosInterfaces";

import {
  IBodyProduct,
  IBodyProductId,
  IBodyProductList,
} from "shared/types/body/products";

import { api } from "shared/utils/request";

import { IProductService } from "./interfaces";
import { FailAlert, SuccessAlert } from "shared/utils/functions/toastyAlerts";

const ProductService = (): IProductService => {
  async function getProducts(
    controller?: AbortController
  ): Promise<IAxiosResponse<IBodyProductList> | void> {
    try {
      const { data } = await api.get("/api/products/get-all-products", {
        signal: controller?.signal,
      });
      return data;
    } catch (error) {
      FailAlert({
        label: "Ocorreu um erro no carregamento dos produtos!",
      });
    }
  }

  async function getProductId(
    id: number,
    controller?: AbortController
  ): Promise<IAxiosResponse<IBodyProductId> | void> {
    try {
      const { data } = await api.get(`/api/products/get-one-product/${id}`, {
        signal: controller?.signal,
      });
      return data;
    } catch (error) {
      FailAlert({
        label: "Ocorreu um erro no carregamento do produto!",
      });
    }
  }

  async function createProduct(
    body: IBodyProduct,
    controller?: AbortController
  ): Promise<void> {
    try {
      const { data } = await api.post("/api/products/create-product", body, {
        signal: controller?.signal,
      });

      SuccessAlert({
        label: data.message,
      });

      return data;
    } catch (error) {
      FailAlert({
        label: "Ocorreu um erro na criação do produto!",
      });
    }
  }

  async function updateProduct(
    id: number,
    body: IBodyProduct,
    controller?: AbortController
  ): Promise<boolean | void> {
    try {
      await api.patch(`/api/products/update-product/${id}`, body, {
        signal: controller?.signal,
      });

      SuccessAlert({
        label: "O produto foi atualizado com sucesso!",
      });

      return true;
    } catch (error) {
      FailAlert({
        label: "Ocorreu um erro na atualização do produto!",
      });
    }
  }

  async function deleteProduct(
    id: number,
    controller?: AbortController
  ): Promise<boolean | void> {
    try {
      await api.delete(`/api/products/delete-product/${id}`, {
        signal: controller?.signal,
      });
      SuccessAlert({
        label: "O produto foi deletado com sucesso!",
      });
      return true;
    } catch (error) {
      FailAlert({
        label: "Ocorreu um erro na deleção do produto!",
      });
    }
  }

  return {
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default ProductService;
