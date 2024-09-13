// "use client";

// import { EDataTestId } from "@src/types/common";
// import { ICPaginationTrack } from "@src/types/root/c-pagnination-track";
// import Link from "next/link";
// import React from "react";

// export const CPaginationTrack = ({
//   currentPage,
//   totalPage,
// }: ICPaginationTrack) => {
//   //have to show total needed page as linkable option
//   const catchNeedTotalPageNumberAsArray = new Array(totalPage).fill("");
//   return (
//     <div
//       data-testid={EDataTestId.CPaginationTrack}
//       className={`flex space-x-2`}
//     >
//       {catchNeedTotalPageNumberAsArray.map((_, ind) => {
//         const trackIndex = ++ind;
//         const activeBg = currentPage == trackIndex && "!bg-[#E0E3EA]";
//         const activeText = currentPage == trackIndex && " !text-[#7F4D4F]";
//         return (
//           <div
//             className={`${activeBg} duration-[0.2s] h-[2rem] w-[2rem]  bg-[#7F4D4F] hover:bg-[#E0E3EA] flex justify-center items-center`}
//             key={ind}
//           >
//             <Link href={`/dashboard/authors?page=${trackIndex}`} legacyBehavior>
//               <span
//                 className={`cursor-pointer ${activeText} duration-[0.2s]  text-white hover:text-[#7F4D4F]  font-bold text-lg`}
//               >
//                 {trackIndex}
//               </span>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

"use client";

import { EDataTestId } from "@src/types/common";
import { ICPaginationTrack } from "@src/types/root/c-pagnination-track";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const CPaginationTrack = ({
  currentPage,
  totalPage,
  url,
}: ICPaginationTrack) => {
  const searchParams = useSearchParams();

  //have to show total needed page as linkable option
  const [redirectUrlParamsWithoutPageNo, setRedirectUrlParamsWithoutPageNo] =
    useState("");

  useEffect(() => {
    const currentSearchParams = searchParams.toString();
    const searchAllOtherSearchParamsExceptPage = currentSearchParams
      .split("&")
      .filter((element) => {
        const convertElementToRegex = new RegExp("page=", "i");
        return !convertElementToRegex.test(element);
      });

    const setRedirectUrlWithoutPageNo =
      searchAllOtherSearchParamsExceptPage.length
        ? "?" + searchAllOtherSearchParamsExceptPage[0] + "&page="
        : "?&page=";
    setRedirectUrlParamsWithoutPageNo(setRedirectUrlWithoutPageNo);
  }, []);
  const totalPagesNeed = new Array(totalPage).fill("");
  return (
    <div
      data-testid={EDataTestId.CPaginationTrack}
      className={`flex space-x-2`}
    >
      {totalPagesNeed.map((_, ind) => {
        const trackIndex = ++ind;
        const activeBg = currentPage == trackIndex && "!bg-[#E0E3EA]";
        const activeText = currentPage == trackIndex && " !text-[#7F4D4F]";
        return (
          <div
            className={`${activeBg} duration-[0.2s] h-[2rem] w-[2rem]  bg-[#7F4D4F] hover:bg-[#E0E3EA] flex justify-center items-center`}
            key={ind}
          >
            <Link
              href={`${url}${redirectUrlParamsWithoutPageNo}${trackIndex}`}
              legacyBehavior
            >
              <span
                className={`cursor-pointer ${activeText} duration-[0.2s]  text-white hover:text-[#7F4D4F]  font-bold text-lg`}
              >
                {trackIndex}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
