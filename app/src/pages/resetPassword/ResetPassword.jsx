import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../component/loading/Loading";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [isResetSuccess, setIsResetSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const resetPassword = async () => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    if (!email || !token) {
      return;
    }
    if (!password || !passwordConfirm) {
      setError("All attribute not be emty!");
      return;
    }

    // const url = `${process.env.REACT_APP_URL_USER}/user/signup`;
    const url = `https://sxn2p36rx3.execute-api.ap-northeast-1.amazonaws.com/prod/user/resetPassword`;

    const body = {
      email,
      password,
      passwordConfirm,
      token,
    };
    try {
      setLoading(true);
      const response = await axios.post(url, body);
      if (response.status === 200) setIsResetSuccess(true);
    } catch (error) {
      setIsResetSuccess(false);
      setError(error.response.data.body.message);
    }
    setLoading(false);
  };

  return (
    <div className="">
      <div className="mx-auto max-w-[380px] p-7 mt-[20px] shadow-xl rounded-xl relative">
        <h1 className="text-[32px] text-center py-7 leading-tight">
          RESET PASSWORD
        </h1>

        <div
          className={`${
            loading || isResetSuccess ? "invisible opacity-0" : ""
          }`}
        >
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

          <div className="text-[14px] text-red-500 mt-1">{error}</div>

          <p className="text-[12px] text-center py-4 text-[#8d8d8d]">
            By changing the account's password, you agree to Exator's Privacy
            Policy and Terms of Use.
          </p>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 mt-4 font-semibold rounded font-['League_Gothic'] text-[18px] hover:opacity-70"
            onClick={() => resetPassword()}
          >
            C O N F I R M
          </button>
        </div>
        {loading ? (
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%]">
            <Loading size="l"></Loading>
          </div>
        ) : (
          isResetSuccess && (
            <div className="absolute w-full top-1/2 left-0 translate-y-[-50%] flex flex-col items-center px-7">
              <div className="">
                <FaCheckCircle className="text-[38px] text-green-600"></FaCheckCircle>
              </div>
              <p className="text-green-600 text-[24px]">
                Changing password successfully!
              </p>
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
