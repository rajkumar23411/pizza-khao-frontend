import React from "react";
import { Link } from "react-router-dom";

const TransactionFail = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <img
        src="/images/red_cross.png"
        alt="fail icon"
        className="h-[40%] rounded-full"
      />
      <h1 className="text-3xl font-semibold text-gray-800">Payment Failed</h1>
      <p className="w-1/2 text-center text-gray-500 py-4">
        We can't process you payment, check your internet connection and try
        again
      </p>
      <Link
        to="/checkout"
        className="bg-red-500 text-white rounded-3xl py-2 px-20 cursor-pointer hover:bg-red-600"
      >
        Try Again
      </Link>
    </div>
  );
};

export default TransactionFail;
