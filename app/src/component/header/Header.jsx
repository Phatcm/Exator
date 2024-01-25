import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showAccount, setShowAccount] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const refIconUser = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (refIconUser.current && refIconUser.current.contains(event.target)) {
          return;
        }
        if (showAccount) {
          setShowAccount(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showAccount]);

  const logOut = () => {
    console.log("log out");
    Cookies.remove("jwt");
    dispatch(setUser({ email: null, name: null }));
    navigate("/signin");
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/dashboard?search=${search}`);
    }
  };
  return (
    <div className="bg-white rounded-xl w-full p-2 flex justify-between items-center h-full">
      <div className="flex justify-between items-center px-3 py-2 bg-[#eff7f9] rounded-xl w-[40%] min-w-[200px]">
        <IoSearchOutline className="text-[22px]"></IoSearchOutline>
        <input
          className="bg-[#eff7f9] ml-2 outline-none w-full"
          type="text"
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onSearch}
        />
      </div>
      <div className="flex relative">
        <div className=" rounded-xl p-2 cursor-pointer hover:bg-slate-200 transition-all ">
          <IoSettingsOutline className="text-[22px]"></IoSettingsOutline>
        </div>
        <div
          ref={refIconUser}
          className={`bg-[#eff7f9] rounded-xl p-2 ml-2 cursor-pointer transition-all hover:bg-slate-200`}
          onClick={() => {
            setShowAccount(!showAccount);
          }}
        >
          <PiFinnTheHumanFill className="text-[22px]"></PiFinnTheHumanFill>
        </div>
        {showAccount && (
          <div ref={ref} className="absolute top-full right-0 z-50">
            <div className="px-4 py-2 bg-white rounded-xl border flex flex-col items-start">
              <div className="p-2 text-[18px]">
                <p className="">Khammaaa</p>
              </div>
              <div className="w-full h-[2px] bg-gray-300"></div>
              <div className="pt-4 flex flex-col gap-2 w-full">
                <div className="flex gap-4 px-1 py-2 cursor-pointer hover:bg-gray-100 rounded-xl">
                  <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-gray-100 p-1 ">
                    <FiUser className="text-[24px]"></FiUser>
                  </div>
                  <p className="">Profile</p>
                </div>
                <div
                  className="flex gap-4 px-1 py-2 cursor-pointer hover:bg-gray-100 rounded-xl"
                  onClick={logOut}
                >
                  <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-gray-100 p-1 ">
                    <IoIosLogOut className="text-[24px]"></IoIosLogOut>
                  </div>
                  <p className="">Log out</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
