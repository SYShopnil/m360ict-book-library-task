export interface IUser {
  email: string;
  password: string;
  name: string;
  profilePicLink: string;
  userType: string;
  gender?: string;
  bio: string;
  birthdate: Date;
  id: number;
}
