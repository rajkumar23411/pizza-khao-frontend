import React from "react";

const UserTransactionBox = () => {
  return (
    <div className="flex items-center justify-between cursor-pointer bg-white py-3 px-4 rounded-md drop-shadow-sm hover:drop-shadow-lg hover:scale-105 w-80">
      <div className="flex items-center gap-2 ">
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/profile-pic.svg?updatedAt=1683123633470"
          alt="user"
          className="h-10 w-10 rounded-full object-cover"
        />
        <p className="flex flex-col justify-between">
          <span className="capitalize font-medium text-gray-800 tracking-wide">
            Jhon Doe
          </span>
          <span className="font-roboto text-xs text-gray-600">
            24/06/2023 at 12:30 pm
          </span>
        </p>
      </div>
      <div className="text-green-700 text-sm font-roboto">+ ₹450.00</div>
    </div>
  );
};

export default UserTransactionBox;
