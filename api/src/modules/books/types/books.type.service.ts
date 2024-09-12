import { IBook } from '../../../type/entity';

export interface GetBooksOptions {
  page: number;
  pageSize: number;
  title?: string;
  author?: string;
}

export interface IRGetBookById extends IBook {}
export interface IRGetBooksByAuthor extends IBook {
  author_name: string;
  authors_bio: string;
}
