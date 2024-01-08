import React, { useEffect, useState } from "react";
import { BsCaretLeftFill } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import NavigationItem from "../navigation-item/NavigationItem";
import { items } from "./item";
import { useLocation } from "react-router-dom";

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [targetItem, setTargetItem] = useState("");
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname;
    const route = pathname.split("/")[1];

    setTargetItem("/" + route);
  });
  return (
    <div
      className={`
      ${isMenuOpen ? "w-[260px] " : "w-[72px]"}
      bg-[#000000] h-full rounded-xl py-5 px-4 relative flex flex-col transition-all duration-500`}
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
      <div className="w-full flex flex-col justify-center items-center">
        {isMenuOpen ? (
          <p className="text-white font-bold mt-[10px] transition-all duration-500 opacity-100">
            EXATOR
          </p>
        ) : (
          <p className="text-white font-bold mt-[10px] invisible transition-all duration-500 opacity-0">
            I
          </p>
        )}
        <div className="mt-20 text-white w-full flex flex-col justify-center items-start ">
          {items.map((item, key) => (
            <NavigationItem
              key={key}
              name={item.name}
              isMenuOpen={isMenuOpen}
              Icon={item.Icon}
              link={item.link}
              targetItem={targetItem}
              setTargetItem={setTargetItem}
            ></NavigationItem>
          ))}
        </div>
      </div>
    </div>
  );
}
