"use client";

import { CSearchBar } from "@src/components/root/search-bar";
import { searchBarHandler } from "@src/lib/author-handler";
import { EDataTestId } from "@src/types/common";
import { usePathname } from "next/navigation";
import React from "react";

export const CProductSearchBarContainer = ({ params }: { params: string }) => {
  const path = usePathname();
  const searchHandler: (inputData: string) => void = async (inputData) => {
    const searchInput = `?${params}=` + inputData;
    const redirectUrl = `${path}${searchInput}`;

    await searchBarHandler(redirectUrl);
  };
  return (
    <div data-testid={EDataTestId.CProductSearchBarContainer}>
      <CSearchBar setSearchInput={searchHandler} />
    </div>
  );
};
