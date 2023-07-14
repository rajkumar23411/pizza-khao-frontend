import React from "react";
import { Link } from "react-router-dom";

const DashBoardLogo = () => {
  return (
    <Link to="/">
      <section className="px-10">
        <div className="flex items-center gap-4 pb-4 border-b border-red-500">
          <i className="fad fa-burger-soda text-4xl text-gray-100"></i>
          <span className="text-xl text-red-100">Pizza Khao</span>
        </div>
      </section>
    </Link>
  );
};

export default DashBoardLogo;
