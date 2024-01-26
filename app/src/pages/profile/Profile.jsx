import React, { useEffect, useState } from "react";
import LinkNav from "../../component/link-nav/LinkNav";
import Loading from "../../component/loading/Loading";
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setName(user.username);
  }, [user]);
  const saveSettings = async () => {
    try {
      if (!name) {
        return;
      }
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        return;
      }

      const url = `${process.env.REACT_APP_URL_USER}/user/updateMe`;
      const body = {
        username: name,
        photo: "default.png",
      };
      const response = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${jwt}`, // No "Bearer" prefix
          "Content-Type": "application/json", // Adjust the content type as needed
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const savePassword = async () => {
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return;
      }
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        return;
      }

      const url = `${process.env.REACT_APP_URL_USER}/user/updateMyPassword`;
      const body = {
        password: newPassword,
        passwordConfirm: confirmPassword,
        passwordCurrent: currentPassword,
      };
      const response = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${jwt}`, // No "Bearer" prefix
          "Content-Type": "application/json", // Adjust the content type as needed
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <LinkNav linksArr={["Profile"]}></LinkNav>
          </div>
          <div className="flex"></div>
        </div>
        {!loading ? (
          <div className="flex flex-1 mt-8 gap-4">
            <div className="flex-1 flex flex-col">
              <div className="flex gap-4">
                <div className="w-[140px] h-[140px] rounded-full border flex justify-center items-center">
                  <PiFinnTheHumanDuotone className="text-[100px]"></PiFinnTheHumanDuotone>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="px-2 py-2 hover:border-[#7697a0] hover:text-[#7697a0] transition-all inline-flex border-b-4 border-black cursor-pointer">
                    Choose new photo
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-[#777]">Name</p>
                <div className="mt-2 bg-[#f2f2f2] px-4 py-2 rounded w-full">
                  <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={30}
                    className="bg-[#f2f2f2] w-full outline-none font-light"
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-[#777]">Email</p>
                <div
                  className="mt-2 bg-[#f2f2f2] px-4 py-2 rounded w-full ;
"
                >
                  <p className="bg-[#f2f2f2] w-full outline-none font-light cursor-not-allowed">
                    {email || "Defautl"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-auto">
                <p
                  className="pb-1 text-black text-[18px] bg-white hover:text-[#7697a0] hover:border-b-4 border-[#7697a0] cursor-pointer transition-all"
                  onClick={saveSettings}
                >
                  Save Settings
                </p>
              </div>
            </div>
            <div className="h-full w-[2px] bg-gray-300"></div>
            <div className="flex-1 flex flex-col">
              <h1 className="text-[24px] font-semibold">PASSWORD CHANGE</h1>
              <div className="mt-8">
                <p className="font-semibold text-[#777]">Current Password</p>
                <div className="mt-2 bg-[#f2f2f2] px-4 py-2 rounded w-full">
                  <input
                    type="password"
                    placeholder={"******"}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    maxLength={30}
                    className="bg-[#f2f2f2] w-full outline-none font-light"
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-[#777]">New Password</p>
                <div className="mt-2 bg-[#f2f2f2] px-4 py-2 rounded w-full">
                  <input
                    type="password"
                    placeholder={"******"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    maxLength={30}
                    className="bg-[#f2f2f2] w-full outline-none font-light"
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-[#777]">Confirm Password</p>
                <div className="mt-2 bg-[#f2f2f2] px-4 py-2 rounded w-full">
                  <input
                    type="password"
                    placeholder={"******"}
                    maxLength={30}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-[#f2f2f2] w-full outline-none font-light"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-auto">
                <p
                  className="pb-1 text-black text-[18px] bg-white hover:text-[#7697a0] hover:border-b-4 border-[#7697a0] cursor-pointer transition-all"
                  onClick={savePassword}
                >
                  Save Password
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Loading size={"xl"}></Loading>
        )}
      </div>
    </div>
  );
}
