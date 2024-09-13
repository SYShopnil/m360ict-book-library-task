import React from "react";

import { IoIosArrowDown } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdQuestionMark } from "react-icons/md";
import { AiOutlineSound } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { IIconStore, IconEnums } from "@src/types/root";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { TbError404 } from "react-icons/tb";

import { Logo } from "./logo";

export const SIconStore = ({ iconName, fill }: IIconStore) => {
  switch (iconName) {
    // case IconEnums.DownArrow: {
    //   return <IoIosArrowDown />;
    // }
    // case IconEnums.GraduationCap: {
    //   return <RiGraduationCapFill fill={fill} size={55} />;
    // }
    // case IconEnums.QuestionSign: {
    //   return <MdQuestionMark fill={fill} size={45} />;
    // }
    // case IconEnums.AiOutlineSound: {
    //   return <AiOutlineSound fill={fill} size={50} />;
    // }
    // case IconEnums.ArrowRight: {
    //   return <FaArrowRight fill={fill} size={25} />;
    // }
    // case IconEnums.DeleteSign: {
    //   return <TiDeleteOutline fill={fill} />;
    // }
    case IconEnums.Logo: {
      return <Logo />;
    }
    // case IconEnums.SiPrivateinternetaccess: {
    //   return <SiPrivateinternetaccess fill={fill} />;
    // }
    case IconEnums.TbError404: {
      return <TbError404 fill={fill} />;
    }
    case IconEnums.FaArrowAltCircleRight: {
      return <FaArrowAltCircleRight fill={fill} />;
    }
    default: {
      return <IoIosArrowDown />;
    }
  }
};
