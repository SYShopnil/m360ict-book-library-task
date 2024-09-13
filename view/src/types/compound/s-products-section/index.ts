import {
  IGetAllAuthorReturn,
  IGetAllProductsReturn,
} from "@src/types/lib/product-handler";

export interface ISAuthorSection {
  requestForGetAllAuthor: Promise<IGetAllAuthorReturn>;
}
