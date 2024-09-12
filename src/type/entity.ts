export interface IAuthor {
  id: string;
  name: string;
  bio: string;
  birthdate: string;
}
export interface IBook {
  id: string;
  title: string;
  description: string;
  published_date: string;
  author_id: string;
}
