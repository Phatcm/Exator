import axios from "axios";
import React, { Fragment, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { PiUploadSimple } from "react-icons/pi";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

export default function CreateTopic({ setIsCreateTopic, getThemes }) {
  const user = useSelector((state) => state.user);
  const [titleFocus, setTitleFocus] = useState(false);
  const [decFocus, setDecFocus] = useState(false);
  const [textFocus, setTextFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setdescriptionValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [titleError, setTitleError] = useState(false);
  const createOnClick = async () => {
    if (titleValue.trim() === "") {
      setTitleError(true);
      return;
    }
    setLoading(true);
    const url = process.env.REACT_APP_URL + "/questions";
    const body = {
      username: user.email,
      topic: titleValue.trim(),
      description: descriptionValue.trim(),
      questions: textValue,
    };
    const response = await axios.post(url, body);
    if (response.status === 200) {
      getThemes();
      toast.success("Create topic successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error("Create topic failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setLoading(false);
    setIsCreateTopic(false);
  };

  return (
    <Fragment>
      <div className="w-full h-full bg-white rounded-xl relative p-4 border-8 border-[#eff7f9] flex flex-col">
        <div className="flex justify-between">
          <div className="">
            <p className="font-semibold text-[24px]">Create Topic</p>
          </div>
          <IoExitOutline
            className="text-[28px] hover:opacity-70 hover:text-[#52818e] cursor-pointer transition-all"
            onClick={() => setIsCreateTopic(false)}
          ></IoExitOutline>
        </div>
        {!loading ? (
          <div className="flex-1 flex flex-col">
            <div className="flex gap-4 h-full mt-4">
              <div className="flex-1 flex flex-col">
                <div
                  className={`
                  ${
                    titleError
                      ? "border-red-600 border-2"
                      : "border-[#94b2ba] border-2"
                  }
                  w-full py-1 px-4 bg-white rounded-xl  border-[#94b2ba] relative overflow-hidden
                  after:content-[''] after:h-1 after:absolute after:w-full after:bg-[#94b2ba] after:left-0 after:bottom-0 after:transition-all
                  ${!titleFocus ? "after:opacity-0" : "after:opacity-100"}`}
                >
                  <p className={` ${titleError && "text-red-600"} text-[12px]`}>
                    Title
                  </p>
                  <input
                    className="w-full text-[18px] outline-none bg-white"
                    type="text"
                    onChange={(e) => {
                      setTitleValue(e.target.value);
                      if (titleError === true) setTitleError(false);
                    }}
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(false)}
                    placeholder="Enter a title, like 'Biology'"
                  />
                </div>
                <div
                  className={`w-full flex-1 flex flex-col py-1 px-4 bg-white rounded-xl border-2 border-[#94b2ba] mt-4 relative overflow-hidden 
              after:content-[''] after:h-1 after:absolute after:w-full after:bg-[#94b2ba] after:left-0 after:bottom-0 after:transition-all
              ${!decFocus ? "after:opacity-0" : "after:opacity-100"}`}
                >
                  <p className="text-[12px]">Decription</p>
                  <textarea
                    maxLength="400"
                    className="w-full h-full text-[18px] outline-none bg-white resize-none"
                    onChange={(e) => setdescriptionValue(e.target.value)}
                    type="text"
                    onFocus={() => setDecFocus(true)}
                    onBlur={() => setDecFocus(false)}
                    placeholder="Add a description...'"
                  />
                </div>
              </div>
              <div
                className={`flex-1 h-full flex flex-col bg-white rounded-xl border-2 border-[#94b2ba] py-1 px-4 relative overflow-hidden
          after:content-[''] after:h-1 after:absolute after:w-full after:bg-[#94b2ba] after:left-0 after:bottom-0 after:transition-all
          ${!textFocus ? "after:opacity-0" : "after:opacity-100"}`}
              >
                <p className="text-[12px]">Text</p>
                <textarea
                  className={`w-full h-full text-[14px] outline-none bg-white resize-none`}
                  type="text"
                  onChange={(e) => setTextValue(e.target.value)}
                  onFocus={() => setTextFocus(true)}
                  onBlur={() => setTextFocus(false)}
                  placeholder="Question-Answer1-Answer2-*RightAnswer-Answer3|Explan
                  Question2-Answer1-Answer2-*RightAnswer-Answer3|Explan
                  ..."
                />
                <div className="w-full mt-2 bg-white border-2 border-[#94b2ba] flex justify-center py-1 rounded-xl mb-1 text-black items-center cursor-pointer hover:text-white hover:bg-[#94b2ba] transition-all">
                  <PiUploadSimple className="text-[20px] mr-2"></PiUploadSimple>
                  <p>Import question</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div
                className="flex items-center py-2 px-4 font-semibold border-2 bg-[#eff7f9] rounded-xl cursor-pointer hover:bg-[#94b2ba] hover:text-white transition-all"
                onClick={() => createOnClick()}
              >
                <IoCreateOutline className="text-[20px] mr-2"></IoCreateOutline>
                <p>Create</p>
              </div>
            </div>
          </div>
        ) : (
          <Loading size={"l"}></Loading>
        )}
      </div>
    </Fragment>
  );
}
