import { IAxiosResponse } from "shared/services/AxiosInterfaces";

import { IBodyUserLogin, IBodyUserRegister } from "shared/types/body/user";

export interface IUserService {
  login: (
    body: IBodyUserLogin,
    controller?: AbortController
  ) => Promise<IAxiosResponse<{ token: string }> | void>;
  register: (
    body: IBodyUserRegister,
    controller?: AbortController
  ) => Promise<boolean | void>;
}
