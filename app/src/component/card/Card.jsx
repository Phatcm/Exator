import React, { Fragment, useEffect, useRef, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";

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
    <div className="flex p-4 bg-[#eff7f9] rounded-xl">
      <div className="border-r pr-4 border-black w-[40%]">{question}</div>
      <div className="px-4 flex-1">{getRightAnswer(answers)}</div>
      <div className="m l-2">
        <RiQuestionAnswerLine className="text-[22px] cursor-pointer hover:opacity-70"></RiQuestionAnswerLine>
      </div>
    </div>
  );
}
