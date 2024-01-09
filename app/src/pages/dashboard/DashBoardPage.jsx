import React, { useEffect, useState } from "react";
import ThemeItem from "../../component/theme-item/ThemeItem";
import { items } from "./themeItems";
import Pagination from "../../component/pagination/Pagination";
import axios from "axios";

export default function DashBoardPage() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const getThemes = async () => {
      const url =
        "https://r784c4ffca.execute-api.ap-northeast-1.amazonaws.com/prod/questions?username=nice";
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
          <div className="flex">
            <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1>
          </div>
          <div className="flex"></div>
        </div>
        <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
          {themes?.map((theme, key) => (
            <ThemeItem
              key={key}
              name={theme.topic}
              // decription={item.description}
              user={theme.username}
            ></ThemeItem>
          ))}
          {items.map((item, key) => (
            <ThemeItem
              key={key}
              name={item.name}
              decription={item.description}
              user={item.user}
            ></ThemeItem>
          ))}
        </div>
        <div className="flex justify-center pt-4 mt-auto">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
}
