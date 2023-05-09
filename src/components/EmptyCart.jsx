import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col py-5 lg:py-20 md:py-10">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/empty_cart.svg?updatedAt=1683123625381"
        alt="empty_cart"
        className="h-40 lg:h-80 md:h-72"
      />
      <p className="uppercase text-golden font-medium text-2xl sm:text-3xl mt-6 sm:mt-10">
        Your cart is empty
      </p>
      <p className="text-gray-600 text-sm sm:text-lg ">
        No items found in cart
      </p>
      <Link
        to="/menu"
        className="bg-red-600 font-normal text-white rounded-sm px-4 mt-3 sm:mt-6 py-2 uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700"
      >
        Update Cart
      </Link>
    </div>
  );
};

export default EmptyCart;
