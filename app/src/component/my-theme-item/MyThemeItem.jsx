import React from "react";
import "./myThemeItem.css";
import { useNavigate } from "react-router-dom";

export default function MyThemeItem({ name, decription, user }) {
  const navigate = useNavigate();

  return (
    <div
      className="group p-2 rounded-xl bg-[#eff7f9] flex flex-col cursor-pointer relative overflow-hidden h-[120px]
            after:content-[''] after:absolute after:h-1 after:w-full after:bg-black after:left-0 after:bottom-0 after:opacity-0 after:transition-all
            hover:after:opacity-100"
      onClick={() => navigate(`/mylibrary/${name}`)}
    >
      <div className="flex justify-between">
        <p className="font-semibold group-hover:text-[#286575]">{name}</p>
      </div>
      <p className="text-[14px] mt-1 limited-lines">{decription}</p>
    </div>
  );
}
