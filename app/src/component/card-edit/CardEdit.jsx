import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function CardEdit({
  index,
  question,
  answers,
  deleteFunction,
  updateCards,
  explain,
}) {
  const textareaQuestionRef = useRef(null);
  const textareaAnswerRef = useRef(null);
  const textareaExplainRef = useRef(null);
  console.log(explain);
  const [currentQuestionValue, setCurrentQuestionValue] = useState(question);
  const [currentAnswerValue, setCurrentAnswerValue] = useState(() => {
    const newAnswers = answers.join("\n");
    return newAnswers;
  });
  const [currentExplainValue, setCurrentExplainValue] = useState(explain || "");
  const [isQuestionFocused, setIsQuestionFocused] = useState(false);
  const [isAnswerFocused, setIsAnswerFocused] = useState(false);
  const [isExplainFocused, setIsExplainFocused] = useState(false);

  useEffect(() => {
    autoExpandQuestionArea();
    autoExpandAnswerArea();
    autoExpandExplainArea();

    const item = {
      index: index,
      card: [
        currentQuestionValue,
        hanlderAnswersToArray(currentAnswerValue),
        currentExplainValue,
      ],
    };

    updateCards(item);
  }, [currentAnswerValue, currentQuestionValue, currentExplainValue]);

  const autoExpandQuestionArea = () => {
    textareaQuestionRef.current.style.height = "0px";

    textareaQuestionRef.current.style.height =
      textareaQuestionRef.current.scrollHeight + "px";
  };

  const autoExpandAnswerArea = () => {
    textareaAnswerRef.current.style.height = "0px";
    textareaAnswerRef.current.style.height =
      textareaAnswerRef.current.scrollHeight + "px";
  };
  const autoExpandExplainArea = () => {
    textareaExplainRef.current.style.height = "0px";
    textareaExplainRef.current.style.height =
      textareaExplainRef.current.scrollHeight + "px";
  };

  const hanlderAnswersToArray = (answers) => {
    const newAnswers = answers.split("\n");
    return newAnswers;
  };

  return (
    <div className="">
      <div className="rounded-tl-xl rounded-tr-xl bg-[#eff7f9] p-4 flex justify-between">
        <div className="">{index}</div>
        <div className="" onClick={deleteFunction}>
          <AiOutlineDelete className="text-[22px] hover:text-red-600 cursor-pointer"></AiOutlineDelete>
        </div>
      </div>
      <div className="bg-[#eff7f9] p-4 mt-1 flex">
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
              className={`w-full outline-none bg-[#eff7f9] overflow-hidden resize-none pb-4`}
              type="text"
              spellCheck="false"
              onChange={(e) => {
                setCurrentQuestionValue(e.target.value);
              }}
              onFocus={() => setIsQuestionFocused(true)}
              onBlur={() => setIsQuestionFocused(false)}
              defaultValue={question}
              placeholder="What is the question..."
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
              }}
              className={`w-full outline-none bg-[#eff7f9] overflow-hidden resize-none pb-4`}
              type="text"
              defaultValue={currentAnswerValue}
              onFocus={() => setIsAnswerFocused(true)}
              onBlur={() => setIsAnswerFocused(false)}
              placeholder="Answer..."
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-[#eff7f9] rounded-bl-xl rounded-br-xl mt-1 relative">
        <p className="text-black font-semibold">
          Explain <span className="font-normal">(options)</span>:
        </p>
        <div
          className={`w-full h-full  transition-all relative 
                  after:content-[''] after:w-full after:absolute after:left-0 after:bottom-0 after:transition-all
                ${
                  isExplainFocused
                    ? "after:bg-[#51bddb] after:h-1"
                    : "after:bg-gray-500 after:h-[2px]"
                }`}
        >
          <textarea
            ref={textareaExplainRef}
            spellCheck="false"
            onChange={(e) => {
              setCurrentExplainValue(e.target.value);
            }}
            className={`w-full outline-none bg-[#eff7f9] overflow-hidden resize-none pb-4`}
            type="text"
            onFocus={() => setIsExplainFocused(true)}
            onBlur={() => setIsExplainFocused(false)}
            defaultValue={explain}
            placeholder="Write explain for this question..."
          />
        </div>
      </div>
    </div>
  );
}
