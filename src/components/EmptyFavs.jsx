import React from "react";
import { Link } from "react-router-dom";

const EmptyFavs = () => {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-4">
      <img
        src="/images/empty_fav.svg"
        alt="empty favourites"
        className="h-64"
      />
      <h1 className="text-golden font-normal text-xl">
        Oops! No favouite item available
      </h1>
      <Link to="/menu">
        <p className="bg-red-500 text-white uppercase font-semibold tracking-wider px-4 py-2 rounded-sm text-sm hover:bg-red-600 cursor-pointer">
          Add items
        </p>
      </Link>
    </div>
  );
};

export default EmptyFavs;
