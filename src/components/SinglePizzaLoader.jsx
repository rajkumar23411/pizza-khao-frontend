import React from "react";

const SinglePizzaLoader = () => {
  return (
    <div className="w-full h-screen sm:p-10 gap-10 flex flex-col lg:flex-row">
      <div
        data-placeholder
        className="flex-1 h-full overflow-hidden rounded relative bg-gray-200 flex items-center justify-center"
      >
        <div>
          <div
            data-placeholder
            className="h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-gray-300"
          ></div>
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col overflow-hidden relative gap-3 sm:gap-6 p-5 sm:p-0">
        <div data-placeholder className="w-64 h-16 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-64 h-10 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-64 h-14 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-full h-20 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-96 h-28 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-64 h-16 bg-gray-200 rounded"></div>
        <div data-placeholder className="w-64 h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SinglePizzaLoader;
