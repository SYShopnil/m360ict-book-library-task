import { IAuthor } from "@src/types/lib/product-handler";

export interface ISCard {
  image: string;
  name: string;
  children: React.ReactNode;
}
export interface ISAuthorCard extends IAuthor {}
