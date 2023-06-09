import React from "react";
import { Link } from "react-router-dom";

const EmptyOrder = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col lg:py-20 md:py-10">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/empty_cart.svg?updatedAt=1683123625381"
        alt="empty_cart"
        className="h-80"
      />
      <p className="uppercase text-golden font-medium text-3xl mt-10">
        Oops! You have not ordered anything yet
      </p>
      <p className="text-gray-600 text-lg">Hurry! Try our tasty pizzas now</p>
      <Link
        to="/menu"
        className="bg-red-600 font-normal text-white rounded-sm px-4 mt-6 py-2 uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700"
      >
        Buy Now
      </Link>
    </div>
  );
};

export default EmptyOrder;
