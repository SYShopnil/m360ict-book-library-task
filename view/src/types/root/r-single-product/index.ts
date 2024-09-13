import {
  IAuthor,
  IGetIndividualProductByIdReturn,
} from "@src/types/lib/product-handler";

export interface IRSingleProduct {
  requestFetchForSingleProduct: Promise<IGetIndividualProductByIdReturn>;
}
export interface IRSinglePage {
  children: React.ReactNode;
  imageUrl: string;
  imageName: string;
  author: IAuthor | null;
}
