"use client";
import React from "react";
import { Button } from "../button";
import { BtnColorSchema } from "@src/types/root";
import { logoutController } from "@src/lib/login-handler";

const CLogout = () => {
  const logoutHandler = async () => {
    try {
      await logoutController();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Button
        btnText="Logout"
        colorSchema={BtnColorSchema.SolidBgVioletTextWhite}
        isArrow={false}
        clickHandler={logoutHandler}
      />
    </React.Fragment>
  );
};
export default CLogout;
