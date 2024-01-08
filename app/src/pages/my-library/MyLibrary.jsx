import React from "react";
import { IoIosAdd } from "react-icons/io";
import ThemeItem from "../../component/theme-item/ThemeItem";
import { items } from "./themeItems";
import Pagination from "../../component/pagination/Pagination";

export default function MyLibrary() {
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">My Library</h1>
          </div>
          <div className="flex">
            <div
              className="flex items-center rounded-xl border border-[#939393] py-1 pl-1 pr-2 cursor-pointer transition-all 
              hover:bg-[#94b2ba] hover:text-white hover:border-white"
            >
              <IoIosAdd className="text-[22px]"></IoIosAdd>
              <p className="text-[14px] font-medium">New</p>
            </div>
          </div>
        </div>
        <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
          {items.map((item, key) => (
            <ThemeItem
              key={key}
              name={item.name}
              decription={item.description}
            ></ThemeItem>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
