export interface IRegisterAuthor {
  name: string;
  bio?: string;
  birthdate: string | Date;
  email: string;
  password: string;
}
