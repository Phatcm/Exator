import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const url = `${process.env.REACT_APP_URL_USER}/user/signin`;
    const body = {
      email,
      password,
    };
    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        const userData = response.data.body.user;
        dispatch(setUser(userData));
        // console.log(response);
        // console.log(document.cookie);
        navigate("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <div className="">
      <div className="mx-auto max-w-[380px] p-7 mt-[100px] shadow-xl rounded-xl">
        <h1 className="text-[32px] text-center py-7 font-['League_Gothic'] leading-tight">
          EXATOR
        </h1>
        <div className="">
          <input
            type="text"
            placeholder="Email"
            autoComplete="nope"
            onChange={(e) => setEmail(e.target.value)}
            className={
              "w-full border rounded-md px-4 py-2 outline-none text-[16px] mb-2"
            }
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="nope"
            onChange={(e) => setPassword(e.target.value)}
            className={"w-full border rounded-md px-4 py-2 outline-none"}
          />
          <div className="flex text-[12px] justify-between my-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                value={true}
                className="text-[#8d8d8d] mr-2 w-4 h-4"
              />
              Keep me signed in
            </div>
            <div>
              <p className="text-[#bcbcbc]">Forgotten your password?</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 font-semibold rounded text-[18px]"
            onClick={() => login()}
          >
            S I G N&nbsp;&nbsp;I N
          </button>
          <p className="text-center text-[#8d8d8d] text-[12px] my-5 flex justify-center">
            Not a Member?&nbsp;
            <span
              className="underline text-[#111] hover:text-red-500 cursor-spanointer"
              onClick={() => navigate("/signup")}
            >
              Join Us
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
