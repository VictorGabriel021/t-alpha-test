export interface IBodyProduct {
  id?: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
}

export interface IBodyProductList {
  products: IBodyProduct[];
}

export interface IBodyProductId {
  product: IBodyProduct;
}
