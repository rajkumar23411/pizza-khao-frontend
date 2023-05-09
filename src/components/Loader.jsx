import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-96 w-full flex-col gap-2">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/spinner.gif?updatedAt=1683273136108"
        alt="loader"
        className="h-24"
      />
      <p className="font-light text-gray-600 animate-pulse">
        Hang on! Fetching your data...
      </p>
    </div>
  );
};

export default Loader;
