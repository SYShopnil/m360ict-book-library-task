export interface IAuthor {
  id: number;
  name: string;
  bio: string;
  birthdate: string | Date;
}
export interface IBook {
  id?: number;
  title: string;
  description: string;
  published_date: string | Date;
  author_id: number;
}
