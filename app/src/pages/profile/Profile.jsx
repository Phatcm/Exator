import React, { useState } from "react";
import LinkNav from "../../component/link-nav/LinkNav";
import Loading from "../../component/loading/Loading";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full flex flex-col relative">
      {/* <h1 className="mt-2 text-[20px] font-semibold">Dashboard</h1> */}
      <div className="w-full flex flex-col flex-1 bg-white rounded-xl p-4 pt-0 overflow-y-auto">
        <div className="flex justify-between bg-white items-center sticky w-full left-0 top-0 py-4 z-20 border-b border-black">
          <div className="flex">
            <LinkNav linksArr={["Favorite"]}></LinkNav>
          </div>
          <div className="flex"></div>
        </div>
        {!loading ? (
          <div className="flex flex-1 flex-col"></div>
        ) : (
          <Loading size={"xl"}></Loading>
        )}
      </div>
    </div>
  );
}
