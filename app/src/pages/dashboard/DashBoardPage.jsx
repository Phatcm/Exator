import React, { useEffect, useState } from "react";
import ThemeItem from "../../component/theme-item/ThemeItem";
import Pagination from "../../component/pagination/Pagination";
import axios from "axios";
import Loading from "../../component/loading/Loading";
import LinkNav from "../../component/link-nav/LinkNav";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

export default function DashBoardPage() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_URL}/topics`;
      const response = await axios.get(url);
      const search = searchParams.get("search");
      let data = response.data;
      if (search) data = data.filter((theme) => theme.topic.includes(search));
      console.log(data);
      setThemes(data);
      setLoading(false);
    };
    getThemes();
    return () => {};
  }, [searchParams]);
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <LinkNav linksArr={["Dashboard"]}></LinkNav>
          </div>
          <div className="flex"></div>
        </div>
        {!loading ? (
          <div className="flex-1 flex flex-col">
            <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
              {themes?.map((theme, key) => (
                <ThemeItem
                  key={key}
                  name={theme.topic}
                  decription={theme.description}
                  user={theme.username}
                ></ThemeItem>
              ))}
            </div>
            <div className="flex justify-center pt-4 mt-auto">
              {/* <Pagination></Pagination> */}
            </div>
          </div>
        ) : (
          <Loading size={"xl"}></Loading>
        )}
      </div>
    </div>
  );
}
