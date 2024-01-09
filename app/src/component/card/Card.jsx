import React, { Fragment, useEffect, useRef, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

export default function Card({ question, selections, explain, isSetting }) {
  const textareaQuestionRef = useRef(null);
  const textareaAnswerRef = useRef(null);

  const [currentQuestionValue, setCurrentQuestionValue] = useState("");
  const [currentAnswerValue, setCurrentAnswerValue] = useState("");
  const [focused, setFocused] = useState(false);

  // console.log(question, selections);
  // const rightAnswer = selections
  //   .find((selection) => {
  //     if (selection[0] === "*") return true;
  //     return false;
  //   })
  //   .slice(1);

  const autoExpandQuestionArea = () => {
    textareaQuestionRef.current.style.height =
      textareaQuestionRef.current.scrollHeight + "px";
  };

  const autoExpandAnswerArea = () => {
    textareaAnswerRef.current.style.height =
      textareaAnswerRef.current.scrollHeight + "px";
  };
  return (
    // <div className="flex p-4 bg-[#eff7f9] rounded-xl">
    //   <div className="border-r pr-4 border-black w-[40%]">{question}</div>
    //   <div className="px-4 flex-1">{rightAnswer}</div>
    //   <div className="m l-2">
    //     <RiQuestionAnswerLine className="text-[22px] cursor-pointer hover:opacity-70"></RiQuestionAnswerLine>
    //   </div>
    // </div>
    <Fragment>
      {!isSetting ? (
        <div className="flex p-4 bg-[#eff7f9] rounded-xl">
          <div className="border-r pr-4 border-black w-[40%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            aliquam vel, beatae accusa
          </div>
          <div className="px-4 flex-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae error
            aliquid perferendis accusantium exercitationem{" "}
          </div>
          <div className="m l-2">
            <RiQuestionAnswerLine className="text-[22px] cursor-pointer hover:opacity-70"></RiQuestionAnswerLine>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="rounded-tl-xl rounded-tr-xl bg-[#eff7f9] p-4 flex justify-end">
            <div className="">
              <AiOutlineDelete className="text-[22px] hover:text-red-600 cursor-pointer"></AiOutlineDelete>
            </div>
          </div>
          <div className="rounded-bl-xl rounded-br-xl bg-[#eff7f9] p-4 mt-1 flex">
            <div className="border-r pr-4 border-black w-[40%]">
              <textarea
                ref={textareaQuestionRef}
                className="w-full outline-none bg-[#eff7f9] overflow-hidden resize-none"
                type="text"
                onChange={(e) => {
                  setCurrentQuestionValue(e.target.value);
                  autoExpandQuestionArea();
                }}
                onFocus={() => setFocused(true)}
                defaultValue={
                  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam vel, beatae accusa"
                }
              />
            </div>
            <div className="px-4 flex-1">
              <textarea
                ref={textareaAnswerRef}
                onChange={(e) => {
                  setCurrentAnswerValue(e.target.value);
                  autoExpandAnswerArea();
                }}
                className="w-full outline-none bg-[#eff7f9] overflow-hidden resize-none"
                type="text"
                defaultValue={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam vel, beatae accusa"
                }
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
