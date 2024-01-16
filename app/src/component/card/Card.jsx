import React, { Fragment, useEffect, useRef, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { IoTriangle } from "react-icons/io5";

export default function Card({ question, answers, explain }) {
  const getRightAnswer = (answers) => {
    if (answers.length > 0) {
      let rightAnswer = answers.filter((answer) => answer[0] === "*");
      return rightAnswer[0].slice(1);
    }
    return "";
  };
  // getRightAnswer(answers);
  return (
    <div className="flex p-4 bg-[#eff7f9] rounded-xl relative">
      <div className="border-r pr-4 border-black w-[40%]">{question}</div>
      <div className="px-4 flex-1">{getRightAnswer(answers)}</div>
      <div className="group ml-2">
        {/* <RiQuestionAnswerFill className="text-[22px] cursor-pointer hover:opacity-70"></RiQuestionAnswerFill> */}
        <RiQuestionAnswerLine className="text-[22px] cursor-pointer hover:opacity-70"></RiQuestionAnswerLine>
        <div
          className={`
            opacity-0 z-50 invisible group-hover:opacity-100 group-hover:visible 
            inline-flex p-4 bg-black text-[#eff7f9] rounded-xl absolute border border-gray-400 right-[0px] top-full transition-all`}
        >
          {explain && explain !== "NULL"
            ? explain
            : "this question don't have a explain."}
          <IoTriangle className="absolute top-0 right-[20px] translate-y-[-80%] text-black "></IoTriangle>
        </div>
      </div>
    </div>
  );
}
