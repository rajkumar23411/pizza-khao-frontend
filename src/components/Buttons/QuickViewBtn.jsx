import React from "react";

const QuickViewBtn = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="bg-slate-200 text-center text-xs sm:text-base px-2 sm:px-6 py-2 sm:py-3 cursor-pointer rounded hover:bg-slate-300 font-normal tracking-widest text-gray-800 uppercase"
    >
      Quick View
    </button>
  );
};

export default QuickViewBtn;
