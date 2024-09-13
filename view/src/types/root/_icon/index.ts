export enum IconName {
  DownArrow = "DownArrow",
  GraduationCap = "GraduationCap",
  QuestionSign = "QuestionSign",
  AiOutlineSound = "AiOutlineSound",
  ArrowRight = "ArrowRight",
  DeleteSign = "TiDeleteOutline",
  Logo = "Logo",
  SiPrivateinternetaccess = "SiPrivateinternetaccess",
  TbError404 = "TbError404",
  FaArrowAltCircleRight = "FaArrowAltCircleRight",
}

export interface IIconStore {
  iconName: IconName;
  fill?: string;
}
