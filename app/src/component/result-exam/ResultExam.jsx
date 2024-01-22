import React from "react";
import { SiCodereview } from "react-icons/si";
import { FaChevronRight } from "react-icons/fa6";
import { IoDocumentsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ResultExam({
  score,
  yourTime,
  linkTopic,
  setShowResult,
}) {
  const navigate = useNavigate();
  const handleScore = (score) => {
    const arrayScore = score.split("/");
    return arrayScore;
  };
  return (
    <div className="p-8 rounded-xl bg-black text-[#939bb4] w-[700px]">
      <h1 className="text-[28px] font-semibold text-white">
        Be kind to yourself, and keep practicing!
      </h1>
      <div className=" flex justify-between mt-8 gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-[20px] text-nowrap">
            Your time:
            <span className="font-semibold ml-4">
              {yourTime.minutes} min {yourTime.seconds} sec
            </span>
          </p>
          <div className="flex flex-col gap-4 text-[18px] font-semibold">
            <div className="flex justify-between text-green-600 items-center">
              <p className="">Correct</p>
              <p className="px-3 py-1 rounded-full border-[4px] border-green-600 font-bold min-w-[60px] text-center">
                {handleScore(score)[0]}
              </p>
            </div>
            <div className="flex justify-between items-center text-orange-400">
              <p className="">Total</p>
              <p className="px-3 py-1 rounded-full border-[4px] border-orange-400 font-bold min-w-[60px] text-center">
                {handleScore(score)[1]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="flex gap-4 items-center p-4 bg-gray-700 rounded-xl h-[100px] 
            hover:border-gray-400 cursor-pointer border-2 border-gray-700 transition-all"
            onClick={() => setShowResult(false)}
          >
            <div className="">
              <SiCodereview className="text-[42px] text-[#87daf1]"></SiCodereview>
            </div>
            <div className="">
              <p className="text-[#87daf1] font-semibold text-[18px]">
                Review an exam
              </p>
              <p>Review your exam to see more infomation.</p>
            </div>
            <div className="text-[#eff7f9] ml-auto">
              <FaChevronRight></FaChevronRight>
            </div>
          </div>
          <div
            className="flex gap-4 items-center p-4 bg-gray-700 rounded-xl h-[100px] 
            hover:border-gray-400 cursor-pointer border-2 border-gray-700 transition-all"
            onClick={() => navigate("/test/maketest")}
          >
            <div className="">
              <IoDocumentsOutline className="text-[42px] text-[#87daf1]"></IoDocumentsOutline>
            </div>
            <div className="">
              <p className="text-[#87daf1] font-semibold text-[18px]">
                Take a new test
              </p>
              <p>Do you want to try another test.</p>
            </div>
            <div className="text-[#eff7f9] ml-auto">
              <FaChevronRight></FaChevronRight>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <div
          className="flex items-center hover:text-gray-200 transition-all cursor-pointer"
          onClick={() => navigate(linkTopic)}
        >
          <p className="">Return a topic</p>
          <FaChevronRight></FaChevronRight>
        </div>
      </div>
    </div>
  );
}
