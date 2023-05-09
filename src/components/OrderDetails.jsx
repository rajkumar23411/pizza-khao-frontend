import React from "react";
import { getDate } from "../utils";
import { Close } from "@mui/icons-material";
const OrderDetails = ({ order, onClose }) => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center border-b-2 border-dashed py-2">
        <h1 className="text-golden font-medium text-base uppercase tracking-wider">
          Order Details
        </h1>
        <Close fontSize="small" onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex items-center gap-1">
          <span className=" font-medium text-gray-800 text-sm">Order ID:</span>
          <span className="text-gray-700 uppercase text-xs sm:text-sm">
            {order._id}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-medium text-gray-800 text-sm">
            order date:
          </span>
          <span className="text-gray-700 text-xs sm:text-sm">
            {getDate(order.orderDate)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-medium text-gray-800 text-sm">
            Deliverd to:
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-600">
            {order.addressId?.name}
          </span>
        </div>
        <div className="flex items-start gap-1">
          <span className="capitalize font-medium text-gray-800 text-sm">
            Address:
          </span>
          <span className="text-gray-700 text-xs sm:text-sm">
            {order.addressId?.locality}, {order.addressId?.address},{" "}
            {order.addressId?.landMark}, {order.addressId?.alternateContact},{" "}
            {order.addressId?.state} - {order.addressId?.pinCode}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-medium text-gray-800 text-sm">
            Order Status:
          </span>
          <span className="text-red-700 font-medium text-sm">
            {order.orderStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
