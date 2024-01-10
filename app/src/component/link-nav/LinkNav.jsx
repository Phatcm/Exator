import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";

export default function LinkNav({ linksArr }) {
  const navigate = useNavigate();
  let url = "";
  return (
    <div className="flex items-center">
      {/* <h1 className="mt-2 text-[20px] font-semibold">{theme}</h1> */}
      {linksArr.map((link, key) => {
        // url = url.append("/"+link.)
        return (
          <Fragment key={key}>
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer"
              onClick={() => navigate()}
            >
              {link}
            </h1>

            {linksArr.length - 1 !== key && (
              <BsChevronCompactRight className="mt-2 text-[22px] mx-1 text-black opacity-80"></BsChevronCompactRight>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
