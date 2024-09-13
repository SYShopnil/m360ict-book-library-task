import { ICommonReturnData } from "@src/types/common";

export interface IProduct {
  productId: string;
  image: string;
  name: string;
  price: string;
  desc: string;
  category: string;
}

export interface IAuthor {
  name: string;
  bio: string;
  birthdate: Date;
  email: string;
  id: number;
}

export interface IGetAllAuthorReturn extends ICommonReturnData {
  payload: {
    authors: IAuthor[];
    totalPage: string;
    currentPage: number;
  };
}
export interface IGetAllProductsReturn extends ICommonReturnData {
  payload: {
    products: IProduct[];
    totalPage: string;
    currentPage: number;
  };
}
export interface IGetIndividualProductByIdReturn extends ICommonReturnData {
  payload: {
    product: IProduct | null;
  };
}

export interface IGetIndividualAuthorByIdReturn extends ICommonReturnData {
  payload: {
    author: IAuthor | null;
  };
}
