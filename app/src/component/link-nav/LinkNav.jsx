import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronCompactRight } from "react-icons/bs";

export default function LinkNav({ linksArr }) {
  const navigate = useNavigate();
  const [navElement, setNavElement] = useState([]);

  useEffect(() => {
    let newNavElemet = [...navElement];
    linksArr.forEach((name, key) => {
      let link = name.replace(/\s/g, "").toLowerCase();
      newNavElemet.push(link);
    });
    setNavElement(newNavElemet);
  }, []);

  const navClick = (index) => {
    console.log(navElement);
    let link = "";
    navElement.forEach((el, key) => {
      if (index > key - 1) {
        link = link + "/" + el;
      }
    });
    navigate(link);
  };
  return (
    <div className="flex items-center">
      {/* <h1 className="mt-2 text-[20px] font-semibold">{theme}</h1> */}
      {linksArr.map((name, key) => {
        let link = name.replace(/\s/g, "").toLowerCase();

        return (
          <Fragment key={key}>
            <h1
              className="mt-2 text-[20px] font-semibold hover:opacity-50 cursor-pointer"
              onClick={() => navClick(key)}
            >
              {name}
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
