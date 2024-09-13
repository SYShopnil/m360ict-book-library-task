import { ICommonReturnData } from "@src/types/common";

export interface IGetAllBookReturn extends ICommonReturnData {
  payload: {
    books: IBook[];
    totalPage: string;
    currentPage: number;
  };
}

export interface IBook {
  title: string;
  description: string;
  published_date: Date;
  author_id: number;
  author_name: string;
  authors_bio: string;
  id: number;
}
