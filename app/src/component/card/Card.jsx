import React, { Fragment, useEffect, useRef, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

export default function Card({
  question,
  selections,
  explain,
  isSetting,
  index,
}) {
  const textareaQuestionRef = useRef(null);
  const textareaAnswerRef = useRef(null);
  const cardRef = useRef(null);

  const [heightCard, setHeightCard] = useState("100px");
  const [currentQuestionValue, setCurrentQuestionValue] = useState("");
  const [currentAnswerValue, setCurrentAnswerValue] = useState("");
  const [isQuestionFocused, setIsQuestionFocused] = useState(false);
  const [isAnswerFocused, setIsAnswerFocused] = useState(false);

  useEffect(() => {
    if (cardRef.current) setHeightCard(`${cardRef.current.offsetHeight}px`);
  }, []);
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
        <div className="flex p-4 bg-[#eff7f9] rounded-xl" ref={cardRef}>
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
          <div className="rounded-tl-xl rounded-tr-xl bg-[#eff7f9] p-4 flex justify-between">
            <div className="">{index}</div>
            <div className="">
              <AiOutlineDelete className="text-[22px] hover:text-red-600 cursor-pointer"></AiOutlineDelete>
            </div>
          </div>
          <div className="rounded-bl-xl rounded-br-xl bg-[#eff7f9] p-4 mt-1 flex">
            <div className="border-r pr-4 border-black w-[40%]">
              <div
                className={`w-full h-full  transition-all relative 
                after:content-[''] after:w-full after:absolute after:left-0 after:bottom-0 after:transition-all
              ${
                isQuestionFocused
                  ? "after:bg-[#51bddb] after:h-1"
                  : "after:bg-gray-500 after:h-[2px]"
              }`}
              >
                <textarea
                  ref={textareaQuestionRef}
                  className={`w-full outline-none h-[${heightCard}] bg-[#eff7f9] overflow-hidden resize-none`}
                  type="text"
                  spellCheck="false"
                  onChange={(e) => {
                    setCurrentQuestionValue(e.target.value);
                    autoExpandQuestionArea();
                  }}
                  onFocus={() => setIsQuestionFocused(true)}
                  onBlur={() => setIsQuestionFocused(false)}
                  defaultValue={
                    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam vel, beatae accusa"
                  }
                />
              </div>
            </div>
            <div className="px-4 flex-1">
              <div
                className={`w-full h-full  transition-all relative 
                  after:content-[''] after:w-full after:absolute after:left-0 after:bottom-0 after:transition-all
                ${
                  isAnswerFocused
                    ? "after:bg-[#51bddb] after:h-1"
                    : "after:bg-gray-500 after:h-[2px]"
                }`}
              >
                <textarea
                  ref={textareaAnswerRef}
                  spellCheck="false"
                  onChange={(e) => {
                    setCurrentAnswerValue(e.target.value);
                    autoExpandAnswerArea();
                  }}
                  className={`w-full h-[${heightCard}] outline-none bg-[#eff7f9] overflow-hidden resize-none`}
                  type="text"
                  onFocus={() => setIsAnswerFocused(true)}
                  onBlur={() => setIsAnswerFocused(false)}
                  defaultValue={
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam vel, beatae accusa"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
