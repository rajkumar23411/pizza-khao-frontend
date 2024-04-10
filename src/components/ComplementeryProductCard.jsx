import React from "react";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const ComplementeryProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (id, qty, size) => {
        dispatch(addToCart(id, size, qty));
    };
    return (
        <div
            className="h-max w-28 md:w-52 bg-white border border-gray-300 shadow-sm overflow-hidden rounded-md group"
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
                <h1 className="font-oswald uppercase text-golden text-xs sm:text-base group-hover:text-red-600">
                    {product.name.length > 28
                        ? `${product.name.slice(0, 28)}...`
                        : product.name}
                </h1>
                <h2 className="text-black text-sm sm:text-base font-oswald">
                    ₹{product.prices?.["regular"]} &#8210; ₹
                    {product.prices?.["extralarge"]}
                </h2>
            </div>
            <button
                onClick={() => handleAddToCart(product._id, "regular", 1)}
                className="w-full text-blue-600 cursor-pointer hover:text-blue-800 py-1 text-sm sm:text-base bg-gray-100 uppercase font-oswald mt-1"
            >
                add to cart
            </button>
        </div>
    );
};

export default ComplementeryProductCard;
