import axios from "axios";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../component/loading/Loading";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!password || !email || !passwordConfirm || !name) {
      setError("All attribute not be emty!");
      return;
    }
    if (!validateEmail) {
      setError("Email is invalid!");
      return;
    }

    // const url = `${process.env.REACT_APP_URL_USER}/user/signup`;
    const url = `https://sxn2p36rx3.execute-api.ap-northeast-1.amazonaws.com/prod/user/signup`;

    const body = {
      username: name,
      email,
      password,
      passwordConfirm,
    };
    try {
      setLoading(true);
      const response = await axios.post(url, body);
      if (response.status === 200) setIsSignUpSuccess(true);
    } catch (error) {
      setIsSignUpSuccess(false);
      setError(error.response.data.body.message);
    }
    setLoading(false);
  };

  const validateEmail = useMemo(() => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }, [email]);
  return (
    <div className="">
      <div className="mx-auto max-w-[380px] p-7 mt-[20px] shadow-xl rounded-xl relative">
        <h1 className="text-[32px] text-center py-7 leading-tight">
          BECOME A MEMBER
        </h1>
        <div className="text-[14px] text-[#8d8d8d] text-center">
          Create your Exator Member profile and get first access to the very
          best of Nike products, inspiration and community.
        </div>
        <div
          className={`${
            loading || isSignUpSuccess ? "invisible opacity-0" : ""
          }`}
        >
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            autoComplete="nope"
            onChange={(e) => setEmail(e.target.value)}
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={6}
            maxLength={50}
            autoComplete="nope"
            onChange={(e) => setPassword(e.target.value)}
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength={6}
            maxLength={50}
            autoComplete="nope"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="text"
            placeholder="Name"
            name="name"
            maxLength={30}
            autoComplete="nope"
            onChange={(e) => setName(e.target.value)}
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <div className="text-[14px] text-red-500 mt-1">{error}</div>

          {/* <input
              type="date"
              placeholder="Date Of Birth"
              name="age"
              autoComplete="nope"
              className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
            /> */}

          {/* <div className="grid grid-cols-3 gap-1 text-[16px] text-[#8d8d8d] mt-2">
              <div className="relative">
                <input
                  id="male"
                  name="gender"
                  value="male"
                  type="radio"
                  className="absolute opacity-0"
                />
                <label
                  htmlFor="male"
                  className={`
                                border w-full h-10 flex justify-center items-center rounded
                                `}
                >
                  <BsCheck className={"hidden"}></BsCheck>
                  Male
                </label>
              </div>
              <div className="relative">
                <input
                  id="female"
                  name="gender"
                  value="female"
                  type="radio"
                  className="absolute opacity-0"
                />
                <label
                  htmlFor="female"
                  className={`
                                border w-full h-10 flex justify-center items-center rounded
                            `}
                >
                  <BsCheck className={"hidden"}></BsCheck>
                  Female
                </label>
              </div>
              <div className="relative">
                <input
                  id="other"
                  name="gender"
                  value="other"
                  type="radio"
                  className="absolute opacity-0"
                />
                <label
                  htmlFor="other"
                  className={`
                                border w-full h-10 flex justify-center items-center rounded
                             `}
                >
                  <BsCheck className={"hidden"}></BsCheck>
                  Other
                </label>
              </div>
            </div> */}

          <p className="text-[12px] text-center py-4 text-[#8d8d8d]">
            By creating an account, you agree to Nike's Privacy Policy and Terms
            of Use.
          </p>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 mt-4 font-semibold rounded font-['League_Gothic'] text-[18px] hover:opacity-70"
            onClick={() => signUp()}
          >
            J O I N&nbsp;&nbsp;U S
          </button>
          <p className="text-center text-[#8d8d8d] text-[12px] mt-5 flex justify-center">
            Already a member ?
            <span
              className="underline hover:text-red-500 cursor-pointer ml-1 transition-all"
              onClick={() => navigate("/signin")}
            >
              Log in.
            </span>
          </p>
        </div>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%]">
            <Loading size="l"></Loading>
          </div>
        ) : (
          isSignUpSuccess && (
            <div className="absolute w-full top-1/2 left-0 translate-y-[-50%] flex flex-col items-center px-7">
              <div className="">
                <FaCheckCircle className="text-[38px] text-green-600"></FaCheckCircle>
              </div>
              <p className="text-green-600 text-[24px]">Sign up success!</p>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 mt-12 font-semibold rounded text-[18px] hover:opacity-70"
                onClick={() => navigate("/signin")}
              >
                GO TO SIGN IN
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
