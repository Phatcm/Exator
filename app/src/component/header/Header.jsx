import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiFinnTheHumanFill } from "react-icons/pi";

export default function Header() {
  return (
    <div className="bg-white rounded-xl w-full p-4 flex justify-between items-center">
      <div className="flex justify-between items-center px-3 py-2 bg-[#eff7f9] rounded-xl w-[40%] min-w-[200px]">
        <IoSearchOutline className="text-[22px]"></IoSearchOutline>
        <input
          className="bg-[#eff7f9] ml-2 outline-none w-full"
          type="text"
          placeholder="Search here..."
        />
      </div>
      <div className="flex">
        <div className=" rounded-xl p-2 cursor-pointer hover:bg-slate-200 transition-all">
          <IoSettingsOutline className="text-[22px]"></IoSettingsOutline>
        </div>
        <div className="bg-[#eff7f9] rounded-xl p-2 ml-2 cursor-pointer hover:bg-slate-200 transition-all">
          <PiFinnTheHumanFill className="text-[22px]"></PiFinnTheHumanFill>
        </div>
      </div>
    </div>
  );
}
