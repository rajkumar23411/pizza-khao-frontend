import React from "react";

const PageTracker = ({ pagename }) => {
  return (
    <div className="flex items-center text-sm gap-2 font-sans">
      <span className="font-roboto">Dashboard</span>
      <i className="far fa-angle-right"></i>
      <span className="font-roboto text-red-800">{pagename}</span>
    </div>
  );
};

export default PageTracker;
