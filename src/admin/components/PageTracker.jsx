import React from "react";

const PageTracker = ({ pagename }) => {
  return (
    <div className="flex items-center justify-center gap-2 font-roboto text-sm">
      <span className="font-roboto">Dashboard</span>
      {typeof pagename === "string" ? (
        <>
          <i className="far fa-angle-right"></i>
          <span className="font-roboto">{pagename}</span>
        </>
      ) : (
        pagename.map((name, indx) => (
          <>
            <i className="far fa-angle-right"></i>
            <span className="font-roboto">{name}</span>
          </>
        ))
      )}
    </div>
  );
};

export default PageTracker;
