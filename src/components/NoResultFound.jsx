import React from "react";
import { Link } from "react-router-dom";

const NoResultFound = () => {
  return (
    <div className="flex items-center justify-center h-96 flex-col gap-5 my-10">
      <img src="/images/sad-cry.gif" alt="pizza gif" className="h-56" />
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-golden">
          Sorry, no results found!
        </h1>
        <p className="text-base text-gray-500">
          Please check the spelling or try searching for something else
        </p>
      </div>
      <Link
        to="/menu"
        className="bg-emerald-600 cursor-pointer uppercase font-semibold text-white p-4 text-sm rounded tracking-wider hover:bg-emerald-700"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default NoResultFound;
