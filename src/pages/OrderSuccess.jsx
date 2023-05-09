import React from "react";
import { Link } from "react-router-dom";
import HomeFooter from "./../components/HomeFooter";
import MainNav from "./../components/MainNav";

const OrderSuccess = () => {
  return (
    <>
      <MainNav />
      <div className="h-max flex items-center justify-center flex-col py-10 lg:py-20">
        <div className="h-64 w-64 sm:h-96 sm:w-96">
          <img
            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/order_success.gif?updatedAt=1683123629759"
            alt="order success"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="lg:text-2xl md:text-xl font-medium text-golden">
          Woohoo! Your order has been placed successfully
        </h1>
        <p className="text-base font-light text-gray-600">
          Will reach you in 30 mins
        </p>
        <Link
          to="/my-order"
          className="bg-purple-600 text-xs sm:text-base rounded-sm text-white font-medium tracking-wider cursor-pointer px-4 py-2 uppercase mt-2 hover:bg-purple-700"
        >
          My orders
        </Link>
      </div>
      <HomeFooter />
    </>
  );
};

export default OrderSuccess;
