import React, { Fragment, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Pagination from "../../component/pagination/Pagination";
import MyThemeItem from "../../component/my-theme-item/MyThemeItem";
import axios from "axios";
import CreateTopic from "../../component/create-topic/CreateTopic";
import Notification from "../../component/notification-popup/Notification";
import LinkNav from "../../component/link-nav/LinkNav";
import Loading from "../../component/loading/Loading";

export default function MyLibrary() {
  const [themes, setThemes] = useState([]);
  const [isCreateTopic, setIsCreateTopic] = useState(false);
  const [showSuccesed, setShowSuccessed] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getThemes();
    return () => {};
  }, []);

  const getThemes = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_URL}/topics?username=nice`;
    const response = await axios.get(url);

    const data = response.data;
    setThemes(data);
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="h-full flex flex-col relative">
        {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
        <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 overflow-y-auto">
          <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
            <div className="flex">
              <LinkNav linksArr={["My library"]}></LinkNav>
            </div>
            <div className="flex">
              <div
                className="flex items-center rounded-xl border border-[#939393] py-1 pl-1 pr-2 cursor-pointer transition-all 
                hover:bg-black hover:text-white hover:border-white"
                onClick={() => setIsCreateTopic(true)}
              >
                <IoIosAdd className="text-[22px]"></IoIosAdd>
                <p className="text-[14px] font-medium">New</p>
              </div>
            </div>
          </div>
          {!loading ? (
            <div className="flex flex-1 flex-col">
              <div className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-4 mt-4 relative z-10">
                {themes?.map((theme, key) => (
                  <MyThemeItem
                    key={key}
                    name={theme.topic}
                    decription={theme.description}
                    user={theme.username}
                  ></MyThemeItem>
                ))}
              </div>
              <div className="flex justify-center mt-auto pt-4">
                <Pagination></Pagination>
              </div>
            </div>
          ) : (
            <Loading size={"xl"}></Loading>
          )}
        </div>
        {isCreateTopic && (
          <div
            className={`
            absolute w-full h-full rounded-xl bg-black bg-opacity-50 transition-all duration-1000 top-0 left-0 z-50 p-20`}
          >
            <CreateTopic
              setIsCreateTopic={setIsCreateTopic}
              setShowSuccessed={setShowSuccessed}
              setShowFailed={setShowFailed}
              getThemes={getThemes}
            ></CreateTopic>
          </div>
        )}
      </div>
      <Notification
        type="success"
        name={"Add successed"}
        isShow={showSuccesed}
      ></Notification>
      <Notification
        type="fail"
        name={"Add failed"}
        isShow={showFailed}
      ></Notification>
    </Fragment>
  );
}
