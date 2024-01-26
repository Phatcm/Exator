import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Question from "../../../component/question-exam/Question";
import axios from "axios";
import ResultExam from "../../../component/result-exam/ResultExam";
import { setExam } from "../../../redux/examSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/loading/Loading";

export default function Exam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exam = useSelector((state) => state.exam);
  const questionRefs = useRef([]);
  const [answersSelection, setAnswersSelection] = useState(
    exam.questions?.map(() => "")
  );
  const [score, setScore] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(
    exam.time ? exam.time * 60 : 999
  );
  const [time, setTime] = useState(0);
  const [disableRadio, setDisableRadio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const scrollToQuestion = (index) => {
    questionRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    if (exam.topic === null) navigate("/test/maketest");
    if (secondsLeft <= 0 || showResult) {
      submitExam();
      return;
    }

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
      setTime(time + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
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
    if (loading === true) return;
    setLoading(true);
    const url = `${process.env.REACT_APP_URL}/exam`;
    const body = {
      username: exam.user,
      attemptId: exam.id,
      answers: answersSelection,
      completeTime:
        getTimeFromSecond(time).minutes + ":" + getTimeFromSecond(time).seconds,
    };
    const response = await axios.post(url, body);
    const data = response.data;
    setScore(data.score);
    setShowResult(true);
    setDisableRadio(true);
    setLoading(false);
    setIsReviewMode(true);
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
              className={`${
                loading ? "" : "hover:bg-black hover:text-white"
              } relative p-2 px-4 font-semibold rounded-xl border border-gray-500 cursor-pointer  transition-all`}
              onClick={() => {
                if (isReviewMode) {
                  navigate(`/Dashboard/${exam.owner}/${exam.topic}`);
                } else {
                  submitExam();
                }
              }}
            >
              <p className={`${loading ? "opacity-0" : "opacity-100"} `}>
                {isReviewMode ? "Return" : "Submit"}
              </p>
              {loading && (
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <Loading size={"s"}></Loading>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 h-[calc(100%-86px)]">
          <div className="w-full h-full rounded-xl border-2 border-[#94b2ba] p-4 overflow-y-auto">
            {exam.questions?.map((question, key) => (
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
                  isReviewMode={isReviewMode}
                ></Question>
              </div>
            ))}
            <div className="flex flex-wrap mt-8 gap-2 ">
              {exam.questions?.map((question, key) => (
                <div
                  className={` ${
                    answersSelection[key].length > 0
                      ? "bg-[#cfeff8] "
                      : "bg-white"
                  }                 

                    p-2 border-2 border-gray-400 rounded-lg w-[40px] h-[40px] items-center justify-center flex cursor-pointer hover:opacity-70
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
      {showResult && (
        <div
          className={`
        absolute w-full h-full rounded-xl bg-black bg-opacity-50 transition-all duration-1000 top-0 left-0 z-50 p-20`}
        >
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <ResultExam
              yourTime={getTimeFromSecond(time)}
              score={score}
              linkTopic={`/Dashboard/${exam.owner}/${exam.topic}`}
              setShowResult={setShowResult}
            ></ResultExam>
          </div>
        </div>
      )}
    </div>
  );
}
