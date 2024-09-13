import { getLoggedInUser } from "@src/lib/user-handler";
import { redirect } from "next/navigation";

export default async function Home() {
  const {
    payload: { isLoggedIn },
  } = await getLoggedInUser();
  isLoggedIn ? redirect("/dashboard/profile") : redirect("/login");
  return <section></section>;
}
