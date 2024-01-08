import React from "react";
import { FiCoffee } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex-1 bg-white rounded-xl mt-2 p-2 overflow-y-auto flex flex-col justify-center items-center">
        <div className="flex items-center gap-2">
          <FiCoffee />
          <p>404 Not Found!</p>
        </div>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
