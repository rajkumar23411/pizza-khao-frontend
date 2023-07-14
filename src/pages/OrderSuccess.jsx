import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeFooter from "./../components/HomeFooter";
import MainNav from "./../components/MainNav";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(5);
  // make a timer for 3 seconds

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer === 0) {
      navigate("/my-order");
    }
    return () => clearInterval(interval);
  }, [navigate, timer]);

  return (
    <>
      <MainNav />
      <div className="h-max flex items-center justify-center flex-col py-10 lg:py-20">
        <div className="h-64 w-64 sm:h-96 sm:w-96">
          <img
            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/20230714192734__fpdl.in__order-confirmed-concept-illustration_353829-159_large.png?updatedAt=1689350417331"
            alt="order success"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="lg:text-2xl md:text-xl  text-blue-700">
          Woohoo! Your order has been placed successfully
        </h1>
        <p className="text-base text-gray-600 mt-4">
          Will reach you in 30 mins
        </p>
        <Link
          to="/my-order"
          className="bg-red-600 text-xs sm:text-base rounded-sm text-white  tracking-wider cursor-pointer px-4 py-2 uppercase mt-2 hover:bg-red-700"
        >
          My orders
        </Link>
        <p className="text-sm underline text-gray-500 mt-6">
          Redirecting to MY ORDERES in {timer}s
        </p>
      </div>
      <HomeFooter />
    </>
  );
};

export default OrderSuccess;
