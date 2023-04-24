import React from "react";
import "../index.css";

const PlaceHolderCard = ({ size }) => {
  return (
    <div className="w-80 flex items-center justify-center flex-col gap-6 overflow-hidden">
      <div
        data-placeholder
        className={`h-48 w-48 rounded-full overflow-hidden relative bg-gray-200`}
      ></div>
      <div
        data-placeholder
        className="h-10 w-[50%] overflow-hidden relative bg-gray-200"
      ></div>
      <div className="flex justify-between gap-4">
        <div
          data-placeholder
          className="h-10 w-40 overflow-hidden relative bg-gray-200"
        ></div>
        <div
          data-placeholder
          className="h-10 w-40 overflow-hidden relative bg-gray-200"
        ></div>
      </div>
    </div>
  );
};

export default PlaceHolderCard;
