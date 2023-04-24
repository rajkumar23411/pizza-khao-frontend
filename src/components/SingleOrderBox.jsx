import React, { useState } from "react";
import ViewOrderDetailsBox from "./ViewOrderDetailsBox";
import { getDate } from "../utils";

const SingleOrderBox = ({ order }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const handleOrderDetialsBox = () => {
    setIsModelOpen(true);
  };

  return (
    <div className="w-[27rem] h-max border-2 rounded p-6 m-auto">
      <div className="flex items-start justify-between border-b-2 pb-4">
        <div className="flex items-start gap-2">
          <div className="h-20">
            <img
              src={order.items[0].productId.image}
              alt={order.items[0].productId.name}
              className="h-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="uppercase font-semibold text-gray-800">
              {order.items[0].productId.name}
            </span>
            <span className="text-base text-gray-500">
              {order.addressId?.locality}, {order.addressId?.city}
            </span>
          </div>
        </div>
        <div className="text-golden">{order.orderStatus}</div>
      </div>
      <div className="pt-4 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-700 font-semibold">
            Order Id
          </span>
          <span className="text-golden font-semibold uppercase">
            {order._id}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-700 font-semibold">
            Order Amount
          </span>
          <span className="text-golden font-semibold">
            ₹{order.totalAmount?.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-700 font-semibold">
            items
          </span>
          <div className="flex gap-1 items-center">
            {order?.items.map((item) => (
              <>
                <span className="text-golden font-medium capitalize">
                  {item.quantity} x {item.productId.name},
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-700 font-semibold">
            Ordered on
          </span>
          <span className="text-golden font-semibold">
            {getDate(order.orderDate)}
          </span>
        </div>
      </div>
      <div className="pt-4 flex w-full items-end justify-end">
        <span
          onClick={handleOrderDetialsBox}
          className="border-[1px] border-red-600 text-red-600 px-4 py-2 rounded font-normal hover:bg-red-600 hover:text-white cursor-pointer"
        >
          View Details
        </span>
      </div>
      {isModelOpen && (
        <ViewOrderDetailsBox
          isModelOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          order={order}
        />
      )}
    </div>
  );
};

export default SingleOrderBox;
