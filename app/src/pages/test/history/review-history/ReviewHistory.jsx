import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionHistory from "../../../../component/question-history/QuestionHistory";
import { useSelector } from "react-redux";

export default function ReviewHistory() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const questionRefs = useRef([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_URL}/history/questions?username=${user.email}&attemptId=${id}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;
        setQuestion(data[0]);
      }
    };
    getThemes();
    return () => {};
  }, []);
  const scrollToQuestion = (index) => {
    questionRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="w-full h-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 relative">
        <div className="flex justify-between bg-white items-center sticky w-full h-[70px] left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">History</h1>
          </div>
          <div className="">
            <p className="text-[20px]">{question.topic}</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`hover:bg-black hover:text-white relative p-2 px-4 font-semibold rounded-xl border border-gray-500 cursor-pointer  transition-all`}
              onClick={() => {
                navigate(-1);
              }}
            >
              <p className={``}>Return</p>
            </div>
          </div>
        </div>
        <div className="mt-4 h-[calc(100%-86px)] flex gap-4">
          <div className="h-full rounded-xl border-2 border-[#94b2ba] p-4 overflow-y-auto w-[70%]">
            {question?.marked_questions?.map((el, key) => (
              <div
                className=""
                key={key}
                ref={(el) => (questionRefs.current[key] = el)}
              >
                <QuestionHistory
                  index={key}
                  question={el}
                  isReviewMode={true}
                ></QuestionHistory>
              </div>
            ))}
            {/* <div className="flex flex-wrap mt-8 gap-2 ">
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
            </div> */}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="">
              <p className="text-[28px] font-bold p-4 rounded-full border-2 border-black">
                {question.score}
              </p>
            </div>
            <div className="mt-4 font text-[20px]">
              <p className="text-center mt-2">{question.complete_time}</p>
              <p className="text-center mt-2">{question.submit_time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
