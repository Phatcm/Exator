import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigationItem({
  name,
  isMenuOpen,
  Icon,
  link,
  targetItem,
  setTargetItem,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`
      ${isMenuOpen ? "py-3 px-4" : "px-1 py-2 justify-center"}
      ${targetItem === link && "bg-[#94b2ba]"} 
      flex items-center cursor-pointer w-full rounded-xl hover:bg-[#94b2ba] transition-all mt-2`}
      onClick={() => {
        setTargetItem(link);
        navigate(link);
      }}
    >
      <Icon className="text-[24px] " />
      <div
        className={`
        ${isMenuOpen ? "w-full opacity-100 ml-3" : "w-0 opacity-0 ml-0"}
        font-medium text-[16px] transition-all duration-500 text-nowrap`}
      >
        {name}
      </div>
    </div>
  );
}
