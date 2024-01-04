import React, { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
import { BsCaretLeftFill } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <div
      className={`
      ${isMenuOpen ? "w-[260px] " : "w-[72px]"}
      bg-[#286575] h-full rounded-xl py-5 px-4 relative flex flex-col transition-all duration-500`}
    >
      <div
        className={`bg-white rounded-full p-2 ml-auto inline-block cursor-pointer absolute hover:bg-gray-300 transition-all duration-1000 top-5 right-4
        ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <BsCaretLeftFill className="text-[20px] w-[24px] h-[24px]"></BsCaretLeftFill>
      </div>
      <div
        className={`bg-white rounded-full p-2 ml-auto inline-block cursor-pointer absolute hover:bg-gray-300 transition-all duration-1000 top-5 right-4
        ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <LuMenu className="text-[20px] w-[24px] h-[24px]"> </LuMenu>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-[24px]">
        {isMenuOpen ? (
          <p className="text-white font-bold mt-5">EXATOR</p>
        ) : (
          <p className="text-white font-bold mt-5 invisible">I</p>
        )}
        <div className="mt-20 text-white w-full flex flex-col justify-center items-start ">
          <div
            className={`
            ${isMenuOpen ? "py-3 px-4" : "px-1 py-2 justify-center"}
            flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all`}
          >
            <BsGridFill className="text-[24px]" />
            <div
              className={`
            ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
            font-medium  transition-all duration-500`}
            >
              Dashboard
            </div>
          </div>
          <div
            className={`
            ${isMenuOpen ? "py-3 px-4" : "px-1 py-2 justify-center"}
            flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2`}
          >
            <FaRegNoteSticky className="text-[24px]" />
            <div
              className={`
            ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
            font-medium  transition-all duration-500`}
            >
              Test
            </div>
          </div>
          <div
            className={`
            ${isMenuOpen ? "py-3 px-4" : "px-1 py-2 justify-center"}
            flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2`}
          >
            <GoHistory className="text-[24px]" />
            <div
              className={`
            ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
            font-medium  transition-all duration-500`}
            >
              History
            </div>
          </div>
          <div
            className={`
            ${isMenuOpen ? "py-3 px-4" : "px-1 py-2 justify-center"}
            flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2`}
          >
            <MdOutlineAdminPanelSettings className="text-[24px]" />
            <div
              className={`
            ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
            font-medium  transition-all duration-500`}
            >
              Adminstration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
