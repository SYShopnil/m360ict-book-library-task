"use client";

import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import styles from "./index.module.css";
import { ICSearchBar } from "@src/types/root/search-bar";

export const CSearchBar = ({
  setSearchInput: setSearchInputProps,
}: ICSearchBar) => {
  const [searchInput, setSearchInput] = useState("");

  // when enter button will be press then auto the search action will be fire
  const keyDownHandlerOfSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key == "Enter" && setSearchInputProps(searchInput);
  };
  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={keyDownHandlerOfSearch}
      />
      <RiSearchLine
        className={styles["search-icon"]}
        onClick={() => setSearchInputProps(searchInput)}
      />
    </div>
  );
};
