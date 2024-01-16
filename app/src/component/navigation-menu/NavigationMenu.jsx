import React, { useEffect, useRef, useState } from "react";
import { BsCaretLeftFill } from "react-icons/bs";
import { LuMenu } from "react-icons/lu";
import NavigationItem from "../navigation-item/NavigationItem";
import { items } from "./item";
import { useLocation } from "react-router-dom";

export default function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [targetItem, setTargetItem] = useState("");
  const location = useLocation();
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [targetChild, setTargetChild] = useState(null);

  const ref = useRef(null);
  useEffect(() => {
    const route = location.pathname.split("/");
    setTargetItem("/" + route[1]);

    setTargetChild("/" + route[2]);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (isMenuOpen) {
          setIsChildOpen(false);
          setIsMenuOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`
      ${isMenuOpen ? "w-[260px] " : "w-[80px]"}
      bg-[#000000] h-full rounded-xl py-5 px-4 relative flex flex-col transition-all duration-500`}
    >
      <div
        className={`bg-white rounded-full p-3 ml-auto inline-block cursor-pointer absolute hover:bg-gray-300 transition-all duration-1000 top-5 right-4
        ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
      >
        <BsCaretLeftFill className="text-[24px] w-[24px] h-[24px]"></BsCaretLeftFill>
      </div>
      <div
        className={`bg-white rounded-full p-3 ml-auto inline-block cursor-pointer absolute hover:bg-gray-300 transition-all duration-1000 top-5 right-4
        ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          setIsChildOpen(false);
        }}
      >
        <LuMenu className="text-[24px] w-[24px] h-[24px]"> </LuMenu>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {isMenuOpen ? (
          <p className="text-white font-bold mt-[10px] transition-all duration-500 opacity-100">
            EXATOR
          </p>
        ) : (
          <p className="text-white font-bold mt-[10px] invisible transition-all duration-500 opacity-0">
            I
          </p>
        )}
        <div className="mt-20 text-white w-full flex flex-col justify-center items-start ">
          {items.map((item, key) => (
            <NavigationItem
              key={key}
              name={item.name}
              isMenuOpen={isMenuOpen}
              Icon={item.Icon}
              link={item.link}
              targetItem={targetItem}
              setTargetItem={setTargetItem}
              child={item.child}
              isChildOpen={isChildOpen}
              setIsChildOpen={setIsChildOpen}
              targetChild={targetChild}
              setTargetChild={setTargetChild}
              setIsMenuOpen={setIsMenuOpen}
            ></NavigationItem>
          ))}
        </div>
      </div>
    </div>
  );
}
