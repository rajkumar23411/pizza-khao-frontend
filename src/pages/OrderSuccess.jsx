import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <img
        src="/images/order_success.gif"
        alt="order success"
        className="h-[50%] rounded-full"
      />
      <h1 className="text-2xl font-semibold text-gray-800">
        Woohoo! Your order has been placed successfully
      </h1>
      <p className="text-base font-medium text-gray-700">
        and will be delivered shortly to you
      </p>
      <Link
        to="/my-order"
        className="bg-purple-600 rounded-sm text-white font-semibold tracking-wider cursor-pointer px-4 py-2 uppercase mt-2 hover:bg-purple-700"
      >
        My orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
