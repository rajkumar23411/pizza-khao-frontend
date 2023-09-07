import React from "react";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 h-full w-full">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/13717663_5326251.svg?updatedAt=1689393571044"
        alt="no results found"
        className="h-96"
      />
      <span className="uppercase text-lg text-yellow-600 tracking-wide font-medium">
        Sorry, No results found
      </span>
      <span className="text-gray-500 font-roboto">
        Please Check your spelling and try again
      </span>
    </div>
  );
};

export default NoResultsFound;
