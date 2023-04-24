import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { getDate } from "../utils";

const OrderDetails = ({ order }) => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center border-b-2 border-dashed py-2">
        <h1 className="text-golden font-semibold text-base uppercase tracking-wider">
          Order Details
        </h1>
        <p className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 hover:underline">
          <span>Download Invoice</span>
          <DescriptionIcon fontSize="small" />
        </p>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <div className="flex items-center gap-1">
          <span className=" font-semibold text-gray-800 text-sm">
            Order ID:
          </span>
          <span className="text-gray-700 uppercase text-sm">{order._id}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-semibold text-gray-800 text-sm">
            order date:
          </span>
          <span className="text-gray-700 text-sm">
            {getDate(order.orderDate)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-semibold text-gray-800 text-sm">
            Deliverd to:
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {order.addressId?.name}
          </span>
        </div>
        <div className="flex  items-center gap-1">
          <span className="capitalize font-semibold text-gray-800 text-sm">
            Address:
          </span>
          <span className="text-gray-700 text-sm ">
            {order.addressId?.locality}, {order.addressId?.address},{" "}
            {order.addressId?.landMark}, {order.addressId?.alternateContact},{" "}
            {order.addressId?.state} - {order.addressId?.pinCode}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="capitalize font-semibold text-gray-800 text-sm">
            Order Status:
          </span>
          <span className="text-red-700 font-semibold">
            {order.orderStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
