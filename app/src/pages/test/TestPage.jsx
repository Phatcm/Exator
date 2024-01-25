import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setExam } from "../../redux/examSlice";

export default function TestPage() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [number, setNumber] = useState(40);
  const [time, setTime] = useState(60);
  const [invalidTopic, setInvalidTopic] = useState(false);
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);
  useEffect(() => {
    setUsernameValue(searchParams.get("username"));
    setTopicValue(searchParams.get("topic"));
  }, []);

  const createTest = async () => {
    let active = true;

    if (usernameValue === null || usernameValue === "") {
      setInvalidUser(true);
      active = false;
    }

    if (topicValue === null || topicValue === "") {
      setInvalidTopic(true);
      active = false;
    }

    if (Number(number) < 1 || number === "") {
      setInvalidNumber(true);
      active = false;
    }

    if (Number(time) < 1 || time === "") {
      setInvalidTime(true);
      active = false;
    }
    if (active === true) {
      const url = `${process.env.REACT_APP_URL}/exam`;
      const params = {
        owner: usernameValue,
        username: user.email,
        topic: topicValue,
        number: number,
      };
      const response = await axios.get(url, { params: params });
      if (response.status === 200) {
        const data = response.data;
        const payload = {
          questions: data[Object.keys(data)[0]],
          time: time,
          user: user.email,
          director: usernameValue,
          topic: topicValue,
          id: Object.keys(data)[0],
        };

        dispatch(setExam(payload));
        navigate("/test/exam");
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">Create a test</h1>
          </div>
          <div className="flex"></div>
        </div>
        <div className="mt-8 h-full">
          <div className="flex gap-4 h-full">
            <div className="w-[35%] flex flex-col p-4 rounded-lg bg-[#eff7f9]">
              <div
                className={`${
                  invalidUser ? "border-red-500 text-red-500" : "border-black"
                } flex rounded-xl border-2  mt-4 p-4 pb-2 relative`}
              >
                <div className="flex-1">
                  <p className="bg-[#eff7f9] absolute top-[-16px] p-1 font-semibold">
                    Username
                  </p>
                  <input
                    className="w-full h-full text-[18px] outline-none bg-[#eff7f9]"
                    type="text"
                    placeholder="Enter a username..."
                    onChange={(e) => {
                      setUsernameValue(e.target.value);
                      if (invalidUser) setInvalidUser(false);
                    }}
                    defaultValue={usernameValue}
                  />
                </div>
                <div className="p-2">
                  <FaChevronDown></FaChevronDown>
                </div>
              </div>
              <div
                className={`${
                  invalidTopic ? "border-red-500 text-red-500" : "border-black"
                } flex rounded-xl border-2  p-4 pb-2 relative mt-4`}
              >
                <div className="flex-1">
                  <p className="bg-[#eff7f9] absolute top-[-16px] p-1 font-semibold">
                    Topic
                  </p>
                  <input
                    className="w-full h-full text-[18px] outline-none bg-[#eff7f9]"
                    type="text"
                    placeholder="Enter a topic ..."
                    onChange={(e) => {
                      setTopicValue(e.target.value);
                      if (invalidTopic) setInvalidTopic(false);
                    }}
                    defaultValue={topicValue}
                  />
                </div>
                <div className="p-2">
                  <FaChevronDown></FaChevronDown>
                </div>
              </div>
              <div className="flex mt-4 gap-4 items-center justify-between">
                <p className="">Timing (minutes): </p>
                <div
                  className={`${
                    invalidTime ? "border-red-500 text-red-500" : "border-black"
                  }
                  p-2 border-2 rounded-xl w-[80px]`}
                >
                  <input
                    type="number"
                    className="w-full h-full text-[18px] outline-none bg-[#eff7f9]"
                    defaultValue={60}
                    onChange={(e) => {
                      setTime(e.target.value);
                      if (invalidTime) setInvalidTime(false);
                    }}
                    min={1}
                    max={999}
                  />
                </div>
              </div>
              <div className="flex mt-4 gap-4 items-center justify-between">
                <p className="">Number of questions: </p>
                <div
                  className={`${
                    invalidNumber
                      ? "border-red-500 text-red-500"
                      : "border-black"
                  }
                  p-2 border-2 rounded-xl w-[80px]`}
                >
                  <input
                    type="number"
                    className="w-full h-full text-[18px] outline-none bg-[#eff7f9]"
                    defaultValue={40}
                    onChange={(e) => {
                      setNumber(e.target.value);
                      if (invalidNumber) setInvalidNumber(false);
                    }}
                    min={1}
                    max={999}
                  />
                </div>
              </div>
              <div className="pt-4 mt-auto flex justify-end items-center">
                <div className="py-2 px-4 rounded-xl border border-black bg-white hover:opacity-70 transition-all cursor-pointer">
                  <p className="text-black">Preview Exam</p>
                </div>
              </div>
            </div>
            <div className="w-[65%] border-2 p-2 border-[#94b2ba] rounded-xl"></div>
          </div>
        </div>
        <div className="mt-auto pt-4 flex justify-end">
          <div
            className={` group
              cursor-pointer flex justify-start items-center bg-[#eff7f9] rounded-xl border border-[#939393] py-3 px-4 pr-8 transition-all duration-500 
              hover:bg-black hover:text-white hover:border-white
              `}
            onClick={() => {
              createTest();
            }}
          >
            <p className="text-[16px] font-medium">Take an exam</p>
            <FaChevronRight className="text-[22px] ml-2 group-hover:translate-x-4 transition-all duration-500 "></FaChevronRight>
          </div>
        </div>
      </div>
    </div>
  );
}
