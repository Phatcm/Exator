import React from "react";
import { useNavigate } from "react-router-dom";

export default function FavoriteItem({ favorite }) {
  const navigate = useNavigate();

  function userClick(event) {
    event.stopPropagation();
    navigate(`/dashboard/${favorite.owner}`);
  }
  return (
    <div
      className="group p-2 rounded-xl bg-[#eff7f9] flex flex-col cursor-pointer relative overflow-hidden max-h-[120px] 
            after:content-[''] after:absolute after:h-1 after:w-full after:bg-black after:left-0 after:bottom-0 after:opacity-0 after:transition-all
            hover:after:opacity-100"
      onClick={() => navigate(`/dashboard/${favorite.owner}/${favorite.topic}`)}
    >
      <div className="flex justify-between">
        <p className="font-semibold group-hover:text-[#286575]">
          {favorite.topic}
        </p>
      </div>
      <p className="text-[14px] mt-1 limited-lines">
        {favorite.questions_count} questions
      </p>
      <div className="mt-auto pt-2">
        <p className=" inline-block hover:text-[#286575]" onClick={userClick}>
          @{favorite.owner}
        </p>
      </div>
    </div>
  );
}
