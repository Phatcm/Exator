import React from "react";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-[380px] p-7">
      <h1 className="text-[32px] text-center py-7 leading-tight">
        BECOME A MEMBER
      </h1>
      <div className="text-[14px] text-[#8d8d8d] text-center">
        Create your Exator Member profile and get first access to the very best
        of Nike products, inspiration and community.
      </div>
      <div className="">
        <form>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            autoComplete="nope"
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="nope"
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="nope"
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="nope"
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <input
            type="date"
            placeholder="Date Of Birth"
            name="age"
            autoComplete="nope"
            className={"w-full border rounded-md px-4 py-2 outline-none mt-2"}
          />

          <div className="grid grid-cols-3 gap-1 text-[16px] text-[#8d8d8d] mt-2">
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
          </div>

          <div className="flex items-center text-[12px] text-[#8d8d8d] mt-2">
            <div className="flex-1 w-5 h-5 mr-3">
              <input
                type="checkbox"
                value={true}
                className="flex-1 text-[#8d8d8d]  w-5 h-5"
              />
            </div>
            <p>
              Sign up for emails to get updates from Nike on products, offers
              and your Member benefits
            </p>
          </div>
          <p className="text-[12px] text-center py-4 text-[#8d8d8d]">
            By creating an account, you agree to Nike's Privacy Policy and Terms
            of Use.
          </p>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 mt-4 font-semibold rounded font-['League_Gothic'] text-[18px]"
          >
            J O I N&nbsp;&nbsp;U S
          </button>
          <p className="text-center text-[#8d8d8d] text-[12px] my-5 flex justify-center">
            Already a member ?{" "}
            <span
              className="underline hover:text-red-500 cursor-pointer ml-1 transition-all"
              onClick={() => navigate("/signin")}
            >
              Log in.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
