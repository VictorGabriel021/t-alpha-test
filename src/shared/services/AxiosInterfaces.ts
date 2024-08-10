export interface IAxiosResponse<T> {
  success: boolean;
  message: string;
  data: T;
  response: any;
}
