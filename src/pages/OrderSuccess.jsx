import React from "react";
import { Link } from "react-router-dom";
import HomeFooter from "./../components/HomeFooter";
import MainNav from "./../components/MainNav";

const OrderSuccess = () => {
  return (
    <>
      <MainNav />
      <div className="h-max flex items-center justify-center flex-col md:py-10 lg:py-20">
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/order_success.gif?updatedAt=1683123629759"
          alt="order success"
          className="lg:h-[50%] md:h-[35%] rounded-full"
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
      <HomeFooter />
    </>
  );
};

export default OrderSuccess;
