import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../component/loading/Loading";

export default function CreatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [isResetSuccess, setIsResetSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="">
      <div className="mx-auto max-w-[380px] p-7 mt-[20px] shadow-xl rounded-xl relative">
        <h1 className="text-[32px] text-center py-7 leading-tight">
          CREATE PASSWORD
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
            By create the account's password, you agree to Exator's Privacy
            Policy and Terms of Use.
          </p>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 mt-4 font-semibold rounded font-['League_Gothic'] text-[18px] hover:opacity-70"
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
                onClick={() => navigate("/dashboard")}
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
