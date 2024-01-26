import axios from "axios";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import GoogleSignIn from "../../component/google-signin/GoogleSignIn";
import Loading from "../../component/loading/Loading";
import Cookies from "js-cookie";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const login = async () => {
    if (!password || !email) {
      setError("Email and password not be emty!");
      return;
    }
    if (!validateEmail) {
      setError("That is not email!");
      return;
    }
    const url = `${process.env.REACT_APP_URL_USER}/user/signin`;

    const body = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await axios.post(url, body, { withCredentials: true });

      if (response.status === 200) {
        const userData = response.data.body.user;
        const options = {
          secure: true, // Cookie will only be sent over HTTPS
          sameSite: "None",
        };
        if (keepSignedIn) options.expired = 7;
        Cookies.set("jwt", response.data.body.token, options);
        dispatch(setUser(userData));
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response.data.body.message);
    }
    setLoading(false);
  };

  const validateEmail = useMemo(() => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }, [email]);
  const forgotPassword = async () => {
    const url = `${process.env.REACT_APP_URL_USER}/user/forgotPassword`;
    if (!email) {
      setError("Email not be emty!");
      return;
    }
    if (!validateEmail) {
      setError("That is not email!");
      return;
    }
    const response = await axios.post(url, { email });
    console.log(response);
  };
  return (
    <div className="">
      <div className="mx-auto max-w-[380px] p-7 mt-[100px] shadow-xl rounded-xl relative">
        <h1 className="text-[32px] text-center py-7 font-['League_Gothic'] leading-tight">
          EXATOR
        </h1>
        <div className={`${loading ? "opacity-0 invisible" : ""}`}>
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
          <div className="text-[14px] text-red-500 mt-1">{error}</div>
          <div className="flex text-[12px] justify-between my-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={keepSignedIn}
                onChange={() => setKeepSignedIn((state) => !state)}
                className="text-[#8d8d8d] mr-2 w-4 h-4"
              />
              Keep me signed in
            </div>
            <div onClick={() => forgotPassword()}>
              <p className="text-[#bcbcbc] hover:text-gray-500 cursor-pointer">
                Forgotten your password?
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 font-semibold rounded text-[18px] hover:opacity-70"
            onClick={() => login()}
          >
            S I G N&nbsp;&nbsp;I N
          </button>
          <p className="text-center text-[#8d8d8d] text-[12px] my-5 flex justify-center">
            Not a Member?&nbsp;
            <span
              className="underline text-[#111] hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Join Us
            </span>
          </p>
          <div className="">
            <GoogleSignIn
              setLoading={setLoading}
              keepSignedIn={keepSignedIn}
            ></GoogleSignIn>
          </div>
        </div>
        {loading && (
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Loading size="l"></Loading>
          </div>
        )}
      </div>
    </div>
  );
}
