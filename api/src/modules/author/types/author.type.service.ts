import { IAuthor } from '../../../type/entity';

export interface IGetAllAuthors {
  authors: IAuthor[];
  total: number;
  totalPages: number;
}

export interface IRGetAuthorById extends IAuthor {
  email: string;
}
export interface IRGetAuthorByEmail extends IAuthor {
  email: string;
  password: string;
}
