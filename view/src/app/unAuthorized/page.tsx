import { SIconWithMessage } from "@src/components/root";
import { IconEnums } from "@src/types/root";
import React from "react";

export default function UnAuthorizedPage() {
  return (
    <React.Fragment>
      <SIconWithMessage
        message="Access Denied!!!"
        icon={IconEnums.SiPrivateinternetaccess}
        url={"/"}
      />
    </React.Fragment>
  );
}
