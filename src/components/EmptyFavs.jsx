import React from "react";
import { Link } from "react-router-dom";

const EmptyFavs = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/empty_fav.svg?updatedAt=1683123625460"
        alt="empty favourites"
        className="h-44 w-44 lg:h-64 md:h-56 object-cover"
      />
      <h1 className="text-golden font-normal text-base sm:text-xl">
        Oops! No favouite items in your bucket
      </h1>
      <Link to="/menu">
        <p className="bg-red-500 text-white uppercase text-sm sm:text-base font-medium tracking-wider px-4 py-2 rounded-sm hover:bg-red-600 cursor-pointer">
          Add items
        </p>
      </Link>
    </div>
  );
};

export default EmptyFavs;
