import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

export default function Pagination() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex justify-center gap-1 items-center">
      <div className="p-1 flex justify-center items-center w-7 h-7 bg-[#eff7f9] rounded-full hover:bg-[#94b2ba] hover:text-white transition-all cursor-pointer">
        <GoChevronLeft></GoChevronLeft>
      </div>
      <div
        className={`
      bg-[#eff7f9] rounded-full flex px-4 items-center gap-1`}
      >
        <div
          className={`${
            page === 1
              ? "bg-[#286575] text-white shadow-3xl rounded-xl shadow-[#286575]"
              : "hover:text-[#286575]"
          } 
          cursor-pointer py-1 px-3 rounded-lg transition-all`}
          onClick={() => setPage(1)}
        >
          1
        </div>
        <div
          className={`${
            page === 2
              ? "bg-[#286575] text-white shadow-3xl rounded-xl shadow-[#286575]"
              : "hover:text-[#286575]"
          } 
          cursor-pointer py-1 px-3 rounded-lg transition-all`}
          onClick={() => setPage(2)}
        >
          2
        </div>
      </div>
      <div className="p-1 flex justify-center items-center w-8 h-8 bg-[#eff7f9] rounded-full hover:bg-[#94b2ba] hover:text-white transition-all cursor-pointer">
        <GoChevronRight></GoChevronRight>
      </div>
    </div>
  );
}
