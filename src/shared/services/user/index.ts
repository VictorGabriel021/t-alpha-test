import { IAxiosResponse } from "shared/services/AxiosInterfaces";

import { IBodyUserLogin, IBodyUserRegister } from "shared/types/body/user";

import { api } from "shared/utils/request";

import { IUserService } from "./interfaces";

import { SuccessAlert, FailAlert } from "shared/utils/functions/toastyAlerts";

const UserService = (): IUserService => {
  async function login(
    body: IBodyUserLogin,
    controller?: AbortController
  ): Promise<IAxiosResponse<{ token: string }> | void> {
    try {
      const { data } = await api.post("/api/auth/login", body, {
        signal: controller?.signal,
      });

      return data;
    } catch (error) {
      const requestError = error as IAxiosResponse<{ token: string }>;

      FailAlert({
        label:
          requestError?.response?.data?.message ||
          "Ocorreu um erro em seu processo!",
      });
    }
  }

  async function register(
    body: IBodyUserRegister,
    controller?: AbortController
  ): Promise<boolean | void> {
    try {
      const { data } = await api.post(`/api/auth/register`, body, {
        signal: controller?.signal,
      });

      SuccessAlert({
        label: data.message,
      });

      return data.success as boolean;
    } catch (error) {
      FailAlert({
        label:
          "Ocorreu um erro ao tentar registrar. Por favor, tente novamente.",
      });
    }
  }

  return {
    login,
    register,
  };
};

export default UserService;
