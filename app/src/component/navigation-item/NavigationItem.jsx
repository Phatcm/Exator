import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";

export default function NavigationItem({
  name,
  isMenuOpen,
  Icon,
  link,
  targetItem,
  setTargetItem,
  child,
  isChildOpen,
  setIsChildOpen,
  targetChild,
  setTargetChild,
  setIsMenuOpen,
}) {
  const navigate = useNavigate();

  return !child ? (
    <div
      className={`
  ${isMenuOpen ? "py-3 px-4" : "px-1 py-3 justify-center"}
  ${targetItem === link && "bg-[#94b2ba]"} 
  flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2`}
      onClick={() => {
        setTargetItem(link);
        navigate(link);
        setTargetChild(null);
        setIsChildOpen(false);
      }}
    >
      <Icon className="text-[24px]" />
      <div
        className={`
    ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
    font-medium text-[16px] transition-all duration-500 text-nowrap`}
      >
        {name}
      </div>
    </div>
  ) : (
    <div className=" w-full">
      <div
        className={`
      ${isMenuOpen ? "py-3 px-4" : "px-1 py-3 justify-center"}
      ${targetItem === link && "bg-[#94b2ba]"} 
      flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2 relative z-50`}
        onClick={() => {
          setIsMenuOpen(true);
          setIsChildOpen(!isChildOpen);
        }}
      >
        <Icon className="text-[24px]" />
        <div
          className={`
    ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
    font-medium text-[16px] transition-all duration-500 text-nowrap`}
        >
          {name}
        </div>
        {isMenuOpen && (
          <div className="">
            <IoChevronDown
              className={`${!isChildOpen ? "block" : "hidden"}`}
            ></IoChevronDown>
            <IoChevronUp
              className={`${isChildOpen ? "block" : "hidden"}`}
            ></IoChevronUp>
          </div>
        )}
      </div>
      <div
        className={`
        ${isChildOpen ? "" : "hidden "}
        pl-12 overflow-hidden`}
      >
        {child.map((el, id) => (
          <div
            key={id}
            className={`
             group mt-4 flex items-center gap-2 cursor-pointer text-nowrap transition-all
            `}
            onClick={() => {
              navigate(`${link + el.link}`);
              setTargetChild(el.link);
              setTargetItem(link);
              setIsMenuOpen(true);
            }}
          >
            {targetChild === el.link && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
            <p
              className={`${
                targetChild === el.link
                  ? "text-white"
                  : "text-[#cdcccc] group-hover:opacity-70"
              }`}
            >
              {el.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
