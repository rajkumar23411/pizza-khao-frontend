import React from "react";

const RecentCustomer = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer bg-white py-3 px-4 rounded-md drop-shadow-sm hover:drop-shadow-lg hover:scale-105 w-80">
      <img
        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/profile-pic.svg?updatedAt=1683123633470"
        alt="user"
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span className="font-medium tracking-wide text-gray-800">
          Jhon Doe
        </span>
        <span className="text-gray-500 font-roboto text-xs">Nalbari, AS</span>
      </div>
    </div>
  );
};

export default RecentCustomer;
