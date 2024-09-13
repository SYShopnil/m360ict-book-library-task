export interface ICommonReturnData {
  message: string;
  status: number;
}

export enum EAuth {
  AuthTokenCookieName = "auth",
}

export enum EDataTestId {
  cLoginFormWithSubmit = "cLoginFormWithSubmit",
  cLogoutContainer = "cLogoutContainer",
  rUserList = "rUserList",
  SHeaderMain = "SHeaderMain",
  SProductSection = "SProductSection",
  SBooksSection = "SBooksSection",
  SProfile = "SProfile",
  CPaginationTrack = "CPaginationTrack",
  RSingleProduct = "RSingleProduct",
  RTableBody = "RTableBody",
  SProductCard = "SProductCard",
  CProductSearchBarContainer = "CProductSearchBarContainer",
}
