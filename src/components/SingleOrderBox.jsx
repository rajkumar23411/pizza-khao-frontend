import React, { useState } from "react";
import ViewOrderDetailsBox from "./ViewOrderDetailsBox";
import { getDate } from "../utils";
import { Dialog } from "@mui/material";

const SingleOrderBox = ({ order }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-[20rem] lg:w-[27rem] md:w-[22rem] h-max border-2 rounded p-6 m-auto">
      <div className="flex items-start justify-between border-b-2 pb-4">
        <div className="flex items-start gap-2">
          <div className="h-16 w-16 sm:h-20 sm:w-20">
            <img
              src={order.items[0].productId.image}
              alt={order.items[0].productId.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="uppercase font-semibold text-gray-800 text-sm sm:text-base">
              {order.items[0].productId.name}
            </span>
            <span className="text-base text-gray-500">
              {order.addressId?.locality}, {order.addressId?.city}
            </span>
          </div>
        </div>
        <div className="text-green-600 text-sm sm:text-base">
          {order.orderStatus}
        </div>
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
            {order?.items.map((item, i) => (
              <div key={i}>
                <span className="text-golden font-medium capitalize">
                  {item.quantity} x {item.productId.name},
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm uppercase tracking-wide text-gray-700 font-semibold">
            Ordered on
          </span>
          <span className="text-golden font-medium">
            {getDate(order.orderDate)}
          </span>
        </div>
      </div>
      <div className="pt-4 flex w-full items-end justify-end">
        <span
          onClick={handleClickOpen}
          className="border-[1px] border-red-600 text-red-600 uppercase py-1 px-4 sm:py-2 text-sm sm:text-base rounded font-normal hover:bg-red-600 hover:text-white cursor-pointer"
        >
          View Details
        </span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <ViewOrderDetailsBox order={order} onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default SingleOrderBox;
