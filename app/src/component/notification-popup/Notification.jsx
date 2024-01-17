import React, { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function Notification({ type, isShow, name }) {
  const array = [
    {
      type: "success",
      color: "36c267",
      bgColor: "f6f6f6",
      component: (
        <div
          className={`
            ${
              isShow
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 translate-y-[-1000px] invisible"
            }
            w-[250px] h-[60px] p-4 bg-[#e7f9f1] border-2 border-[#36c267] rounded-xl transition-all duration-1000 fixed top-4 right-4`}
        >
          <div className="flex gap-2 items-center justify-between h-full w-full">
            <div className="flex items-center gap-4">
              <FaCheck className="text-[#f6f6f6] text-[28px] p-1 rounded-full bg-[#36c267]"></FaCheck>
              <p className={`text-[#36c267]`}>{name}</p>
            </div>
            <div className="">
              <ImCross className={`text-[#36c267]`}></ImCross>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "fail",
      color: "#d04d52",
      bgColor: "#faeded",
      component: (
        <div
          className={`
        ${
          isShow
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-1000px]"
        }
          w-[250px] h-[60px] p-4 bg-[#faeded] border-2 border-[#d04d52] rounded-xl transition-all duration-1000 fixed top-4 right-4`}
        >
          <div className="flex gap-2 items-center justify-between h-full w-full ">
            <div className="flex items-center gap-4">
              <FaCheck className="text-[#faeded] text-[28px] p-1 rounded-full bg-[#d04d52]"></FaCheck>
              <p className={`text-[#d04d52]`}>{name}</p>
            </div>
            <div className="">
              <ImCross className={`text-[#d04d52]`}></ImCross>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {array.map((item, key) => {
        if (type === item.type)
          return <Fragment key={key}>{item.component}</Fragment>;
      })}
    </Fragment>
  );
}
