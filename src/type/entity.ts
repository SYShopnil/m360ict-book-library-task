export interface IAuthor {
  id: string | number;
  name: string;
  bio: string;
  birthdate: string | Date;
}
export interface IBook {
  id?: string | number;
  title: string;
  description: string;
  published_date: string | Date;
  author_id: number;
}
