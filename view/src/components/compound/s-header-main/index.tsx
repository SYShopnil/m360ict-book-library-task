import React from "react";
import { SIconStore } from "@src/components/root";
import { IconName } from "@src/types/root/_icon";
import Link from "next/link";
import { getLoggedInUser } from "@src/lib/user-handler";
import { EDataTestId } from "@src/types/common";
import dynamic from "next/dynamic";

const DynamicLogout = dynamic(() => import("../../root/c-logout/index"), {
  ssr: false,
});
export async function SHeaderMain() {
  const {
    payload: { isLoggedIn, loggedInUser },
  } = await getLoggedInUser();
  return (
    <nav
      data-testid={EDataTestId.SHeaderMain}
      className={`flex flex-col lg:flex-row   items-center space-y-4 lg:space-y-0 p-4 mb-3`}
    >
      <div className={`flex-[1_1_85%]`}>
        <Link href={"/"}>
          <span className={`bg-[#FAFCFF] inline-block p-2 `}>
            <SIconStore iconName={IconName.Logo} />
          </span>
        </Link>
      </div>
      <div className={`space-y-4 lg:space-y-2 flex-[1_1_15%] `}>
        <div>
          <p className={`font-bold text-white text-lg`}>
            {loggedInUser && `Hello ${loggedInUser.name}!!`}
          </p>
        </div>
        {isLoggedIn && <DynamicLogout />}
      </div>
    </nav>
  );
}
