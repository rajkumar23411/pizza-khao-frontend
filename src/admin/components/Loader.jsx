import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center py-10 leading-3 w-full">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/icons8-magnifying-glass.gif?updatedAt=1688872537557"
        alt="searching.."
        className="mix-blend-darken h-8"
      />
      <span className="font-roboto tracking-tight text-gray-500">
        Searching...
      </span>
    </div>
  );
};

export default Loader;
