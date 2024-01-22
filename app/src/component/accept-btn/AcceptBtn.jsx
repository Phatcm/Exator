import React from "react";

export default function AcceptBtn({ name, clickFunction }) {
  let btn = <div></div>;
  switch (name) {
    case "save":
      btn = (
        <div
          className={`group py-1 px-4 border-2 border-[#15803d] hover:bg-[#16a34a] transition-all rounded-xl cursor-pointer`}
          onClick={() => {
            clickFunction();
          }}
        >
          <div
            className={`text-[#15803d] font-semibold group-hover:text-white`}
          >
            Save
          </div>
        </div>
      );

      break;
    case "delete":
      btn = (
        <div
          className={`group py-1 px-4 border-2 border-[#ff0000c3] hover:bg-[#c70000] transition-all rounded-xl cursor-pointer`}
          onClick={() => {
            clickFunction();
          }}
        >
          <div
            className={`text-[#ff0000c3] font-semibold group-hover:text-white`}
          >
            {name}
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return btn;
}
