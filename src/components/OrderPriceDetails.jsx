import React from "react";

const OrderPriceDetails = ({ order }) => {
  return (
    <div className="p-4">
      <h1 className="text-golden font-semibold text-base uppercase tracking-wider border-b-2 border-dashed">
        Price Details
      </h1>
      <div className="flex flex-col gap-1 w-full mt-4">
        <div className="w-full flex items-end justify-between">
          <span className="text-gray-700 font-medium  text-base">
            Item total
          </span>
          <span className="text-gray-600 font-semibold">
            ₹{order?.itemsPrice?.toFixed(2)}
          </span>
        </div>
        <div className="w-full flex items-end justify-between">
          <span className="text-gray-700 font-medium  text-base">Tax</span>
          <span className="text-gray-600">₹{order?.tax?.toFixed(2)}</span>
        </div>
        <div className="w-full flex items-end justify-between">
          <span className="text-gray-700 font-medium  text-base">
            Delivery Charge
          </span>
          <span className="text-gray-600">
            ₹{order?.deliveryCharge?.toFixed(2)}
          </span>
        </div>
        <div className="w-full flex items-center justify-between border-t-2 pt-2">
          <span className="text-red-600 text-base uppercase font-semibold">
            Grand Total
          </span>
          <span className="text-red-600 text-base font-semibold">
            ₹{order?.totalAmount?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderPriceDetails;
