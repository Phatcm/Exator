import axios from "axios";
import React from "react";

export default function AdminPage() {
  const click = async () => {
    const response = await axios.post(
      "https://0ngec1ipbc.execute-api.ap-northeast-1.amazonaws.com/dev/mypath"
    );

    console.log(response);
  };
  const click2 = async () => {
    const response = await axios.delete(
      "https://0ngec1ipbc.execute-api.ap-northeast-1.amazonaws.com/dev/mypath"
    );

    console.log(response);
  };
  return (
    <div className="h-full flex flex-col">
      <h1 className="mt-2 text-[20px] font-semibold">Adminstration</h1>
      <div className="w-full flex-1 bg-white rounded-xl mt-2 p-2 overflow-y-auto">
        <button onClick={click}>POST</button>
        <button onClick={click2} className="ml-4">
          DELETE
        </button>
      </div>
    </div>
  );
}
