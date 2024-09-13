"use server";
import { cookies } from "next/headers";
import { ILoginController } from "@src/types/lib/login-handler";
import { redirect } from "next/navigation";
import { EAuth } from "@src/types/common";
import axios from "axios";

export async function LoginController({
  email,
  password,
}: ILoginController): Promise<void> {
  let redirectPath = "";
  try {
    const url = `${process.env.SERVER_ORIGIN}/author/login`;
    const body = { email, password };
    const response = await axios.post(url, body);
    if (response.status == 202) {
      const cookieStore = cookies();
      const jwtToken = response.data.access_token;
      cookieStore.set(EAuth.AuthTokenCookieName, jwtToken);
      redirectPath = "/dashboard/profile";
    } else {
      redirectPath = "/unAuthorized";
    }
  } catch (err) {
    redirectPath = "/unAuthorized";
    console.log(err);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      redirect("/unAuthorized");
    }
  }
}

export async function logoutController() {
  const cookieStore = cookies();
  let redirectUrl: string = "";
  try {
    cookieStore.delete(EAuth.AuthTokenCookieName);
    redirectUrl = "/login";
  } catch (err) {
    redirectUrl = "/";
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    } else {
      redirect("/");
    }
  }
}
