import { ICommonReturnData } from "@src/types/common";
import { IUser } from "@src/types/db/user";

export interface ISearchIndividualUserByEmailReturn extends ICommonReturnData {
  payload: {
    user: IUser | null;
  };
}

export interface IGetLoggedInUserResponse extends ICommonReturnData {
  payload: {
    isLoggedIn: boolean;
    loggedInUser: IUser | null;
  };
}
