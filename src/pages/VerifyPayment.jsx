import React from "react";

const VerifyPayment = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <img
        src="/images/transaction_success.gif"
        alt="transaction success"
        className="h-[50%] rounded-full"
      />
      <h1 className="text-2xl font-semibold text-green-600">
        Payment successfull
      </h1>
      <p className="text-blue-500 py-2">
        Transaction Number: <span className="font-semibold">123456789</span>
      </p>
      <div className="w-80 py-2">
        <div className="flex items-center justify-between w-full">
          <p className="uppercase text-gray-500">Total amount paid</p>
          <p className="font-semibold text-gray-800">₹4000.00</p>
        </div>
      </div>
      <div className="flex items-center">
        Paid by{" "}
        <img
          src="/images/razorpay-icon.svg"
          alt="razorpay icon"
          className="h-5"
        />
      </div>
    </div>
  );
};

export default VerifyPayment;
