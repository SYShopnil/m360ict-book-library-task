import { IGetAllBookReturn } from "@src/types/lib/book-handler";
import {
  IGetAllAuthorReturn,
  IGetAllProductsReturn,
} from "@src/types/lib/product-handler";

export interface ISBookSection {
  requestForGetAllBook: IGetAllBookReturn;
}
