export interface IBodyUserRegister {
  name: string;
  taxNumber: string;
  mail: string;
  phone: string;
  password: string;
}

export interface IBodyUserLogin {
  taxNumber: string;
  password: string;
}
