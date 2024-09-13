export interface ILoginController {
  email: string;
  password: string;
}
export interface ILoginControllerResponse {
  status: number;
  payload: {
    token: string;
    isLoggedIn: boolean;
  };
  message: string;
}
