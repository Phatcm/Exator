import axios from "axios";
import React from "react";

export default function AdminPage() {
  const click = async () => {
    const response = await axios.post(
      "https://r784c4ffca.execute-api.ap-northeast-1.amazonaws.com/prod/questions",
      {
        name: "nice",
        topic: "test1",
        questions:
          "If Nemo ran in the woods, he would?-absorb chocolate-planet Earth-flip forward and backward-*It is the right one.\nThe flag of Oklahoma is mostly?-*blue-red-not blue-yellow",
      }
    );

    console.log(response);
  };
  return (
    <div className="h-full flex flex-col">
      <h1 className="mt-2 text-[20px] font-semibold">Adminstration</h1>
      <div className="w-full flex-1 bg-white rounded-xl mt-2 p-2 overflow-y-auto">
        <button onClick={click}>click me</button>
      </div>
    </div>
  );
}
