import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Question from "../../../component/question-exam/Question";
import axios from "axios";
import ResultExam from "../../../component/result-exam/ResultExam";

export default function Exam() {
  const exam = useSelector((state) => state.exam);
  const questionRefs = useRef([]);
  const [answersSelection, setAnswersSelection] = useState(
    exam.questions.map(() => "")
  );
  const [showResult, setShowResult] = useState(false);
  const scrollToQuestion = (index) => {
    questionRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  const getTimeFromSecond = (seconds) => {
    const timeMinutes = Math.floor(seconds / 60);
    const timeSeconds = seconds - timeMinutes * 60;

    let stringSeconds = "00";
    if (timeSeconds < 10) {
      stringSeconds = "0" + timeSeconds.toString();
    } else stringSeconds = timeSeconds.toString();
    return { minutes: timeMinutes, seconds: stringSeconds };
  };

  const submitExam = async () => {
    const url = `${process.env.REACT_APP_URL}/exam`;
    const body = {
      username: exam.user,
      attemptId: exam.id,
      answers: answersSelection,
      submitTime: "45:00",
    };
    const response = await axios.post(url, body);
    console.log(response);
    setShowResult(true);
  };
  return (
    <div className="h-full flex flex-col relative">
      <div className="w-full h-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 relative">
        <div className="flex justify-between bg-white items-center sticky w-full h-[70px] left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">Test</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold text-[22px] text-[#2e505a]">
              {getTimeFromSecond(secondsLeft).minutes} :{" "}
              {getTimeFromSecond(secondsLeft).seconds}
            </p>
            <div
              className="p-2 px-4 font-semibold rounded-xl border border-gray-500 cursor-pointer hover:bg-black hover:text-white transition-all"
              onClick={() => submitExam()}
            >
              <p>Submit</p>
            </div>
          </div>
        </div>
        <div className="mt-4 h-[calc(100%-86px)]">
          <div className="w-full h-full rounded-xl border-2 border-[#94b2ba] p-4 overflow-y-auto">
            {exam.questions.map((question, key) => (
              <div
                className=""
                key={key}
                ref={(el) => (questionRefs.current[key] = el)}
              >
                <Question
                  index={key}
                  question={question}
                  setAnswersSelection={setAnswersSelection}
                  answersSelection={answersSelection}
                ></Question>
              </div>
            ))}
            <div className="flex flex-wrap mt-8 gap-2 ">
              {exam.questions.map((question, key) => (
                <div
                  className={` ${
                    answersSelection[key].length > 0
                      ? "bg-[#b4dae4] "
                      : "bg-white"
                  }                   
                    p-2 border border-gray-400 rounded-lg w-[40px] h-[40px] items-center justify-center flex cursor-pointer hover:opacity-70
                  `}
                  onClick={() => {
                    scrollToQuestion(key);
                  }}
                >
                  <p className="text-[18px]">{key + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {!showResult && (
        <div
          className={`
        absolute w-full h-full rounded-xl bg-black bg-opacity-50 transition-all duration-1000 top-0 left-0 z-50 p-20`}
        >
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[600px]">
            <ResultExam yourTime={"45:00"} score={"3/15"}></ResultExam>
          </div>
        </div>
      )}
    </div>
  );
}
