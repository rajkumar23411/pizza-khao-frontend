import React from "react";
import { Link } from "react-router-dom";

const DashBoardNavTag = ({ iconClass, tagName, link }) => {
  return (
    <Link
      to={`${link}`}
      className="flex items-center gap-6 py-3 px-10 hover:bg-red-800 cursor-pointer text-white text-lg"
    >
      <i className={`${iconClass}`}></i>
      <span className="tracking-wide font-light">{tagName}</span>
    </Link>
  );
};

export default DashBoardNavTag;
