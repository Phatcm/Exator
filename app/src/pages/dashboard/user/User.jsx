import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";
import { PiFinnTheHumanFill } from "react-icons/pi";
import axios from "axios";
import ThemeItem from "../../../component/theme-item/ThemeItem";
import Pagination from "../../../component/pagination/Pagination";

export default function User() {
  const { user } = useParams();
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const getThemes = async () => {
      const url = `https://y6lgr4ka12.execute-api.ap-northeast-1.amazonaws.com/prod/topics?username=${user}`;
      const response = await axios.get(url);

      const data = response.data;
      console.log(data);
      setThemes(data);
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

            <h1 className="mt-2 text-[20px] font-semibold">{user}</h1>
          </div>
          <div className="flex"></div>
        </div>
        <div className="relative z-10">
          <div className="flex gap-4 items-center py-4">
            <div className="rounded-full border bg-[#eff7f9]">
              <PiFinnTheHumanFill className="w-[80px] h-[80px]"></PiFinnTheHumanFill>
            </div>
            <div className="flex-1 flex flex-col ">
              <h1 className="text-[20px]">@{user}</h1>
            </div>
          </div>
          <div className="flex relative mt-4">
            <div
              className="relative 
            after:content-[''] after:absolute after:h-[2px] after:w-full after:bg-[#94b2ba] after:left-0 after:top-full after:transition-all"
            >
              Study sets
            </div>
          </div>
          <div className="mt-4">
            <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
              {themes.map((theme, key) => (
                <ThemeItem
                  key={key}
                  name={theme.topic}
                  decription={theme.description}
                  user={theme.username}
                ></ThemeItem>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4 mt-auto">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
