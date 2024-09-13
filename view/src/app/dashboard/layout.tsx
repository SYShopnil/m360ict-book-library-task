import Link from "next/link";
import React from "react";
import { menuItems } from "@src/types/app/dashboard/layout";
import { getLoggedInUser } from "@src/lib/user-handler";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    payload: { loggedInUser },
  } = await getLoggedInUser(); // get the logged in user

  if (loggedInUser) {
    return (
      <div className={`grid grid-cols-12 `}>
        <nav className={`col-span-12 lg:col-span-2 bg-[#E0E3EA] p-4 space-y-2`}>
          {menuItems.map((item, ind) => {
            return (
              <Link href={item.url} key={ind}>
                <div
                  className={`${
                    item.isActive
                      ? "bg-[#7F4D4F] text-[#FAFCFF]"
                      : "bg-[#FAFCFF]"
                  } hover:bg-[#7F4D4F] duration-[0.2s] hover:text-[#FAFCFF] rounded-sm  p-[0.5rem] `}
                >
                  <span>{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className={`col-span-12 lg:col-span-10 `}>{children}</div>
      </div>
    );
  } else {
    redirect("/");
  }
}
