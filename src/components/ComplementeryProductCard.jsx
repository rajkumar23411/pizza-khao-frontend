import React from "react";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

const ComplementeryProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    const handleAddToCart = (id, qty, size) => {
        dispatch(addToCart(id, size, qty));
    };
    return (
        <div
            className="h-max w-28 md:w-52 bg-white border border-gray-300 shadow-sm overflow-hidden rounded-md"
            key={product._id}
        >
            <div className="h-20 md:h-36 w-full relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"
                />
            </div>
            <div className="w-full px-1 sm:px-2">
                <h1 className="uppercase font-medium text-golden text-xs sm:text-base">
                    {isSmallScreen
                        ? `${product.name.slice(0, 10)}...`
                        : product.name}
                </h1>
                <h2 className="font-roboto text-red-600 font-medium text-xs sm:text-sm">
                    ₹{product.prices?.["regular"]}
                </h2>
            </div>
            <button
                onClick={() => handleAddToCart(product._id, "regular", 1)}
                className="w-full text-green-600 cursor-pointer hover:text-green-800 pb-1 text-sm sm:text-base"
            >
                ADD
            </button>
        </div>
    );
};

export default ComplementeryProductCard;
