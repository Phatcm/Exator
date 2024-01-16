import React from "react";
import { SiCodereview } from "react-icons/si";
import { FaChevronRight } from "react-icons/fa6";
import { IoDocumentsOutline } from "react-icons/io5";

export default function ResultExam({ score, yourTime }) {
  return (
    <div className="p-4 rounded-xl bg-black text-[#939bb4]">
      <h1 className="text-[28px] text-white">
        Be kind to yourself, and keep practicing!
      </h1>
      <div className=" flex justify-between mt-4">
        <div className="">
          <p className="text-[20px]">Your time: {yourTime} min</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center p-4 bg-gray-700 rounded-xl">
            <div className="">
              <SiCodereview className="text-[42px] text-[#eff7f9]"></SiCodereview>
            </div>
            <p className="text-[#eff7f9] font-semibold">Review an exam</p>
            <div className="text-[#eff7f9]">
              <FaChevronRight></FaChevronRight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
