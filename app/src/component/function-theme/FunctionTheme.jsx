import React from "react";

export default function FunctionTheme({
  name,
  Icon,
  isSetting,
  clickFunction,
}) {
  return (
    <div
      className={`
        ${
          isSetting
            ? "opacity-0 cursor-default"
            : "opacity-100 cursor-pointer hover:bg-black hover:text-white hover:border-white"
        }
        w-[140px] flex justify-start items-center bg-[#eff7f9] rounded-xl border border-[#939393] py-3 px-2 transition-all 
        `}
      onClick={() => {
        if (clickFunction) clickFunction();
      }}
    >
      <Icon className="text-[22px] mr-2"></Icon>
      <p className="text-[14px] font-medium">{name}</p>
    </div>
  );
}
