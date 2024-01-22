import React, { useEffect, useState } from "react";
import Pagination from "../../../component/pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { IoStarOutline } from "react-icons/io5";
import { functionItems } from "./functionThemeItems";
import FunctionTheme from "../../../component/function-theme/FunctionTheme";
import Card from "../../../component/card/Card";
import axios from "axios";
import NotFound from "../../notfound/NotFound";
import Loading from "../../../component/loading/Loading";
import LinkNav from "../../../component/link-nav/LinkNav";
import { FaStar } from "react-icons/fa";

export default function Theme() {
  const { user, theme } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_URL}/questions?username=${user}&topic=${theme}`;
      const response = await axios.get(url);

      const data = response.data;

      if (data[0]) {
        await checkFavorite();
        setTopic(data[0]);
        setQuestions(data[0].questions);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    const checkFavorite = async () => {
      const url = `${process.env.REACT_APP_URL}/favorite?username=nice`;
      const response = await axios.get(url);
      if (response.status === 200) {
        response.data.forEach((el) => {
          if (el.topic === theme && el.owner === user) setIsFavorite(true);
        });
      }
    };

    getThemes();
    return () => {};
  }, []);

  const testClick = () => {
    const link = `/test/maketest?isMine=0&username=${user}&topic=${theme}`;
    navigate(link);
  };
  const saveFavorite = async () => {
    const url = `${process.env.REACT_APP_URL}/favorite?username=nice&owner=${user}&topic=${theme}`;
    const response = await axios.post(url);
    if (response.status === 200) {
      setIsFavorite(true);
    }
  };
  const cancelFavorite = async () => {
    const url = `${process.env.REACT_APP_URL}/favorite?username=nice&owner=${user}&topic=${theme}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      setIsFavorite(false);
    }
  };
  return !notFound ? (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 mt-4 relative overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex items-center">
            <LinkNav linksArr={["Dashboard", user, theme]}></LinkNav>
          </div>
          <div className="flex"></div>
        </div>
        {!loading && topic ? (
          <div className="flex flex-col flex-1">
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-semibold">{topic.topic}</h1>
                {!isFavorite ? (
                  <IoStarOutline
                    className="mr-2 text-[28px] text-yellow-600 cursor-pointer hover:opacity-70 "
                    onClick={() => saveFavorite()}
                  ></IoStarOutline>
                ) : (
                  <FaStar
                    className="mr-2 text-[28px] text-yellow-600 cursor-pointer hover:opacity-70"
                    onClick={() => cancelFavorite()}
                  ></FaStar>
                )}
              </div>
              <p className="mt-2 break-all">{topic.description}</p>
            </div>
            <div className="flex mt-8 gap-3 flex-wrap justify-end">
              {functionItems.map((item, key) => (
                <FunctionTheme
                  key={key}
                  name={item.name}
                  Icon={item.Icon}
                  clickFunction={() => {
                    if (item.name === "Test") {
                      testClick();
                    }
                  }}
                ></FunctionTheme>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-[20px] font-semibold">
                Term in this set ({questions.length})
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {questions.map((question, key) => (
                <Card
                  key={key}
                  question={question[0]}
                  answers={question[1]}
                  explain={question[2]}
                ></Card>
              ))}
            </div>
            <div className="flex justify-center pt-4 mt-auto">
              <Pagination></Pagination>
            </div>
          </div>
        ) : (
          <Loading size={"xl"}></Loading>
        )}
      </div>
    </div>
  ) : (
    <NotFound></NotFound>
  );
}
