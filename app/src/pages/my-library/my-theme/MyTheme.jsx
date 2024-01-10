import React, { useState } from "react";
import Pagination from "../../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";
import { functionItems } from "./functionThemeItems";
import FunctionTheme from "../../../component/function-theme/FunctionTheme";
import Card from "../../../component/card/Card";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import AcceptBtn from "../../../component/accept-btn/AcceptBtn";
import LinkNav from "../../../component/link-nav/LinkNav";

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
    const response = await axios.delete(url);
    console.log(response);
  };
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="">
            <LinkNav linksArr={["Dashboard", theme]}></LinkNav>
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
                <AcceptBtn
                  name={"save"}
                  clickFunction={() => setIsSetting(false)}
                ></AcceptBtn>
                <AcceptBtn
                  name={"delete"}
                  clickFunction={deleteTheme}
                ></AcceptBtn>
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
              isSetting={isSetting}
            ></FunctionTheme>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-[20px] font-semibold">Term in this set (15)</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Card isSetting={isSetting} index={1}></Card>
          <Card isSetting={isSetting} index={2}></Card>
          <Card isSetting={isSetting} index={3}></Card>
        </div>
        <div className="flex justify-center pt-4 mt-auto">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
