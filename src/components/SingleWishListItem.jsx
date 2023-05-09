import { Rating, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const SingleWishListItem = ({
  item,
  handleRemoveFromWishlist,
  handleAddtoCart,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <div className=" px-3 sm:p-3 flex flex-col justify-center items-center  sm:shadow-sm border-none sm:border-[1px] border-gray-100 rounded w-max sm:w-60">
      <Link
        to={`/pizza/${item.product._id}`}
        className="cursor-pointer text-center"
      >
        <div className="h-20 w-20 sm:h-28 sm:w-28">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="uppercase tracking-wider text-xs font-medium text-golden sm:text-base">
          {item.product.name}
        </p>
        <Rating
          precision={0.5}
          readOnly={true}
          value={item.product.ratings}
          size="small"
        />
        <p className="text-red-600 font-medium text-sm sm:text-base">
          ₹{item.product.prices.regular} - ₹{item.product.prices.extralarge}
        </p>
      </Link>
      {isSmallScreen ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
          <p
            className="bg-blue-600 text-white rounded-sm py-1 px-2 text-xs uppercase font-normal"
            onClick={() => handleAddtoCart(item.product._id, 1, "regular")}
          >
            Add to cart
          </p>
          <p
            className="uppercase text-red-600 text-xs"
            onClick={() => handleRemoveFromWishlist(item.product._id)}
          >
            Remove
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 w-full">
          <p
            className="border-2 border-red-600 bg-red-600 text-white rounded-sm text-center uppercase tracking-wide text-xs sm:text-sm py-1 cursor-pointer flex-1 hover:bg-red-700"
            onClick={() => handleRemoveFromWishlist(item.product._id)}
          >
            Remove
          </p>
          <p
            className="bg-white border-2 border-blue-600 text-blue-600 rounded-sm text-center uppercase tracking-wide text-sm  py-1 cursor-pointer flex-1 hover:border-blue-700 hover:text-blue-700"
            onClick={() => handleAddtoCart(item.product._id, 1, "regular")}
          >
            Add to cart
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleWishListItem;
