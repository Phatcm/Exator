import React, { useState } from "react";
import Pagination from "../../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";
import { functionItems } from "./functionThemeItems";
import FunctionTheme from "../../../component/function-theme/FunctionTheme";
import Card from "../../../component/card/Card";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";

export default function MyTheme() {
  const [isSetting, setIsSetting] = useState(false);
  const { user, theme } = useParams();
  const navigate = useNavigate();
  const settingsClick = (event) => {
    setIsSetting(!isSetting);
  };

  const deleteTheme = async () => {
    const url = `https://r784c4ffca.execute-api.ap-northeast-1.amazonaws.com/prod/topic?username=nice&topic=test1`;
    console.log(url);
    const response = await axios.delete(url, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "DELETE", // Allow DELETE requests
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    });
    console.log(response);
  };
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex items-center">
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer"
              onClick={() => navigate("/mylibrary")}
            >
              My Library
            </h1>

            <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>

            <h1 className="mt-2 text-[20px] font-semibold">{theme}</h1>
          </div>
          <div className="overflow-hidden">
            <div
              className={`
              ${isSetting ? "translate-x-0" : "translate-x-[calc(100%-36px)]"}
              flex items-center gap-2 transition-all`}
            >
              <div
                className="cursor-pointer hover:opacity-70 hover:bg-[#eff7f9] transition-all p-1 rounded-full"
                onClick={settingsClick}
              >
                <IoSettingsOutline
                  className={`${
                    isSetting ? "rotate-0" : "rotate-180"
                  } text-[28px] transition-all duration-500`}
                ></IoSettingsOutline>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="group py-1 px-4 border-2 border-green-600 hover:bg-green-700 transition-all rounded-xl cursor-pointer"
                  onClick={() => setIsSetting(false)}
                >
                  <p className="text-green-600 font-semibold group-hover:text-white">
                    Save
                  </p>
                </div>
                <div
                  className="group py-1 px-4 border-2 border-[#ff0000c3] hover:bg-[#c70000] transition-all rounded-xl cursor-pointer"
                  onClick={() => {
                    deleteTheme();
                  }}
                >
                  <div className="text-[#ff0000c3] font-semibold group-hover:text-white">
                    Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-semibold">lore</h1>
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
          <Card isSetting={isSetting}></Card>
          <Card isSetting={isSetting}></Card>
          <Card isSetting={isSetting}></Card>
        </div>
        <div className="flex justify-center pt-4 mt-auto">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
