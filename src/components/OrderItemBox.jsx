import React from "react";

const OrderItemBox = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-b-2 p-2 sm:p-4 w-full">
      <div className="flex items-center justify-start gap-2 sm:gap-4 flex-1">
        <div className="h-14 w-14 sm:h-20 sm:w-20">
          <img
            src={item.productId.image}
            alt={item.productId.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="uppercase font-medium text-xs sm:text-sm tracking-wide text-golden">
            {item.productId.name}
          </span>
          <span className="text-xs text-gray-500">Size: {item.size}</span>
          <span className="text-xs text-gray-500">
            Quantity: {item.quantity}
          </span>
          <span className="text-gray-600 font-semibold text-sm">
            ₹{item.productId.prices[item.size]}
          </span>
        </div>
      </div>
      <div className="text-base text-gray-600 font-semibold justify-center sm:flex items-center flex-1 hidden">{`${
        item.quantity
      } x ₹${item.productId.prices[item.size]}`}</div>
      <div className="font-semibold text-red-600 flex-[0.5] flex items-center justify-end">
        ₹{(item?.quantity * item?.productId?.prices[item.size]).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItemBox;
