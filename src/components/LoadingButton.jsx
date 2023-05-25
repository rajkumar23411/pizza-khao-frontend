import React from "react";

const LoadingButton = ({ buttonText, buttonColor }) => {
  return (
    <div
      className={`w-full h-10 sm:h-12 ${buttonColor} text-white cursor-pointer rounded-md text-sm uppercase flex items-center justify-center gap-2 overflow-hidden shadow-inner  shadow-red-600`}
    >
      <i className="fas fa-spinner fa-spin text-xl text-white"></i>
      {buttonText}...
    </div>
  );
};

export default LoadingButton;
