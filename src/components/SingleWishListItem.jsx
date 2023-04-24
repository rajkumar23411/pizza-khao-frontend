import { Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const SingleWishListItem = ({
  item,
  handleRemoveFromWishlist,
  handleAddtoCart,
}) => {
  return (
    <div className="p-3 flex flex-col justify-center items-center shadow-sm border-[1px] border-gray-100 rounded w-60">
      <Link
        to={`/pizza/${item.product._id}`}
        className="cursor-pointer text-center"
      >
        <div className="h-28 w-28">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="uppercase tracking-wider text-base font-medium text-golden">
          {item.product.name}
        </p>
        <Rating
          precision={0.5}
          readOnly={true}
          value={item.product.ratings}
          size="small"
        />
        <p className="text-red-600 font-medium">
          ₹{item.product.prices.regular} - ₹{item.product.prices.extralarge}
        </p>
      </Link>
      <div className="flex items-center justify-between gap-3 mt-4 w-full">
        <p
          className="border-2 border-red-600 bg-red-600 text-white rounded-sm text-center uppercase tracking-wide  text-sm py-1 cursor-pointer flex-1 hover:bg-red-700"
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
    </div>
  );
};

export default SingleWishListItem;
