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
        <div className="w-full border border-gray-300 rounded-md p-4 group relative">
            <button
                className="fas fa-trash absolute top-4 right-4 text-lg text-gray-400 hover:text-red-600"
                title="Remove from wishlist"
                onClick={() => handleRemoveFromWishlist(item.product?._id)}
            />
            <Link
                to={`/pizza/${item.product?._id}`}
                className="cursor-pointer text-center flex gap-6"
            >
                <div className="h-36 w-36">
                    <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex items-start flex-col">
                    <h1 className="uppercase font-oswald text-lg group-hover:text-green-600">
                        {item.product?.name}
                    </h1>
                    <div className="flex items-center justify-center gap-[2px] text-yellow-600">
                        <h2 className="text-sm font-oswald">
                            {item.product?.ratings}
                        </h2>
                        <p className="fas fa-star text-xs" />
                        <h2 className="text-gray-600 text-sm pl-2">
                            ({item.product?.numOfReviews})
                        </h2>
                    </div>
                    <div className="text-gray-500 text-sm pt-2">
                        Categories: {item.product?.category.join(", ")}
                    </div>
                    <div className="pt-2 flex items-center justify-center gap-2">
                        <span className="text-lg font-oswald font-medium text-red-600">
                            ₹{item.product?.prices["regular"]}
                        </span>
                        {item.product?.discount !== 0 && (
                            <span className="text-sm font-light font-oswald text-golden">
                                {item.product?.discount}% off
                            </span>
                        )}
                    </div>
                </div>
                {/* <div className="h-20 w-20 sm:h-28 sm:w-28">
                    <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <p className="uppercase tracking-wider text-xs font-medium text-golden sm:text-base">
                    {item.product?.name}
                </p>
                <p className="text-red-600 font-medium text-sm sm:text-base">
                    ₹{item.product?.prices.regular} - ₹
                    {item.product?.prices.extralarge}
                </p> */}
            </Link>
            {/* {isSmallScreen ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <p
                        className="bg-blue-600 text-white rounded-sm py-1 px-2 text-xs uppercase font-normal"
                        onClick={() =>
                            handleAddtoCart(item.product?._id, 1, "regular")
                        }
                    >
                        Add to cart
                    </p>
                    <p
                        className="uppercase text-red-600 text-xs"
                        onClick={() =>
                            handleRemoveFromWishlist(item.product?._id)
                        }
                    >
                        Remove
                    </p>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 w-full">
                    <p
                        className="border-2 border-red-600 bg-red-600 text-white rounded-sm text-center uppercase tracking-wide text-xs sm:text-sm py-1 cursor-pointer flex-1 hover:bg-red-700"
                        onClick={() =>
                            handleRemoveFromWishlist(item.product?._id)
                        }
                    >
                        Remove
                    </p>
                    <p
                        className="bg-white border-2 border-blue-600 text-blue-600 rounded-sm text-center uppercase tracking-wide text-sm  py-1 cursor-pointer flex-1 hover:border-blue-700 hover:text-blue-700"
                        onClick={() =>
                            handleAddtoCart(item.product?._id, 1, "regular")
                        }
                    >
                        Add to cart
                    </p>
                </div>
            )} */}
        </div>
    );
};

export default SingleWishListItem;
