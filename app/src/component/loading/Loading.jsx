import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="h-full flex flex-col">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex-1 flex bg-white items-center justify-center rounded-xl">
        <AiOutlineLoading3Quarters className="text-[40px] animate-spin"></AiOutlineLoading3Quarters>
      </div>
    </div>
  );
}
