import React from "react";

export default function FunctionTheme({ name, Icon }) {
  return (
    <div
      className="w-[140px] flex justify-start items-center bg-[#eff7f9] rounded-xl border border-[#939393] py-3 px-2 cursor-pointer transition-all 
    hover:bg-black hover:text-white hover:border-white"
    >
      <Icon className="text-[22px] mr-2"></Icon>
      <p className="text-[14px] font-medium">{name}</p>
    </div>
  );
}
