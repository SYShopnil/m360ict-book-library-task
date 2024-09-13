import { cookies } from "next/headers";
import { IGetLoggedInUserResponse } from "@src/types/lib/user-handler";
import { EAuth } from "@src/types/common";
import axios from "axios";

export async function getLoggedInUser(): Promise<IGetLoggedInUserResponse> {
  try {
    const cookiesStore = cookies();
    const getAuthToken = cookiesStore.get(EAuth.AuthTokenCookieName); //this toke should be a decrypted jwt token
    if (getAuthToken) {
      const { value: token } = getAuthToken;
      const url = `${process.env.SERVER_ORIGIN}/auth/loggedIn/user`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 202) {
        const user = response.data.user;
        return {
          message: response.data.message,
          status: 202,
          payload: {
            isLoggedIn: true,
            loggedInUser: user,
          },
        };
      } else {
        return {
          message: response.data.message,
          status: 404,
          payload: {
            isLoggedIn: false,
            loggedInUser: null,
          },
        };
      }
    } else {
      return {
        message: "Auth token not available",
        status: 404,
        payload: {
          isLoggedIn: false,
          loggedInUser: null,
        },
      };
    }
  } catch (err) {
    return {
      message: "Some things went wrong",
      status: 404,
      payload: {
        isLoggedIn: false,
        loggedInUser: null,
      },
    };
  }
}
