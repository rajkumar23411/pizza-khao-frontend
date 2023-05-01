import React from "react";

const PageHead = ({ pageName }) => {
  return (
    <div className="h-72 bg-page-head bg-center bg-cover w-full flex items-center px-10">
      <h1 className="font-extrabold text-white lg:text-6xl md:text-4xl font-roboto tracking-wide uppercase">
        {pageName}
      </h1>
    </div>
  );
};

export default PageHead;
