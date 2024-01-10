import React, { useEffect, useState } from "react";
import Pagination from "../../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";
import { IoStarOutline } from "react-icons/io5";
import { functionItems } from "./functionThemeItems";
import FunctionTheme from "../../../component/function-theme/FunctionTheme";
import Card from "../../../component/card/Card";
import axios from "axios";

export default function Theme() {
  const { user, theme } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getThemes = async () => {
      const url =
        "https://r784c4ffca.execute-api.ap-northeast-1.amazonaws.com/prod/questions?username=nice";
      const response = await axios.get(url);

      const data = response.data;

      const questions = data.find(
        (element) => element.username === user && element.topic === theme
      ).questions;
      setQuestions(questions);
    };
    getThemes();
    return () => {};
  }, []);
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex items-center">
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </h1>
            <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer "
              onClick={() => navigate(`/dashboard/${user}`)}
            >
              {user}
            </h1>
            <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>

            <h1 className="mt-2 text-[20px] font-semibold">{theme}</h1>
          </div>
          <div className="flex"></div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-semibold">lore</h1>
            <IoStarOutline className="mr-2 text-[28px] text-yellow-600"></IoStarOutline>
          </div>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis, culpa doloremque dolor, aperiam reiciendis ad illo modi
            voluptas doloribus minima quam dicta ratione alias quisquam unde
            aspernatur magni expedita cumque?
          </p>
        </div>
        <div className="flex mt-8 gap-3 flex-wrap justify-end">
          {functionItems.map((item, key) => (
            <FunctionTheme
              key={key}
              name={item.name}
              Icon={item.Icon}
            ></FunctionTheme>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[20px] font-semibold">Term in this set (15)</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {questions.map((question, key) => (
            <Card
              key={key}
              question={question[0]}
              selections={question[1]}
            ></Card>
          ))}
        </div>
        <div className="flex justify-center pt-4 mt-auto">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
