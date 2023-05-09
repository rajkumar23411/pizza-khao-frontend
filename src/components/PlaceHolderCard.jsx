import React from "react";
import "../index.css";

const PlaceHolderCard = ({ size }) => {
  return (
    <div className="w-80 flex items-center justify-center flex-col gap-3 md:gap-6 overflow-hidden">
      <div
        data-placeholder
        className={`h-24 w-24 md:h-48 md:w-48 rounded-full overflow-hidden relative bg-gray-200`}
      ></div>
      <div
        data-placeholder
        className="h-6 md:h-10 w-[20%] md:w-[50%] overflow-hidden relative bg-gray-200"
      ></div>
      <div className="flex justify-between gap-2 md:gap-4">
        <div
          data-placeholder
          className="h-8 w-32 md:h-10 md:w-40 rounded overflow-hidden relative bg-gray-200"
        ></div>
        <div
          data-placeholder
          className="hidden sm:block h-8 w-32 md:h-10 md:w-40 rounded  overflow-hidden relative bg-gray-200"
        ></div>
      </div>
    </div>
  );
};

export default PlaceHolderCard;
