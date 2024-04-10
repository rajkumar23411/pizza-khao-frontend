import React from "react";
import { Link } from "react-router-dom";

const EmptyFavs = () => {
    return (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
            <img
                src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/empty_fav.svg?updatedAt=1683123625460"
                alt="empty favourites"
                className="h-44 w-44 lg:h-64 lg:w-64 md:h-56 md:w-56 object-cover"
            />
            <h1 className="font-normal text-base tracking-tight sm:text-xl">
                Oops! No favouite items in your bucket
            </h1>
            <Link to="/menu">
                <button className="font-oswald bg-red-500 text-white uppercase px-4 py-2 rounded-md hover:bg-red-600">
                    Add items
                </button>
            </Link>
        </div>
    );
};

export default EmptyFavs;
