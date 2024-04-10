import React, { useState } from "react";
import ViewOrderDetailsBox from "./ViewOrderDetailsBox";
import { multiFormatDateString, statusColor } from "../utils";
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
                        <span className="uppercase font-oswald font-medium text-gray-800 text-sm sm:text-base">
                            {order.items[0].productId.name}
                        </span>
                        <span className="text-base text-gray-500">
                            {order.addressId?.locality}, {order.addressId?.city}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div
                        className={`h-2 w-2 rounded-full animate-fade animate-infinite animate-duration-[2000ms] animate-delay-200 animate-ease-in ${statusColor(
                            order.orderStatus
                        )}`}
                    />
                    <div className={` text-sm sm:text-base `}>
                        {order.orderStatus}
                    </div>
                </div>
            </div>
            <div className="pt-4 flex flex-col gap-3">
                <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-golden font-oswald font-medium">
                        Order Id
                    </span>
                    <span className="uppercase">{order._id}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-700 font-oswald font-medium">
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
                    <span className="text-sm uppercase tracking-wide text-gray-700 font-oswald font-medium">
                        Ordered on
                    </span>
                    <span className="text-golden font-medium">
                        {multiFormatDateString(order.orderDate)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-golden font-oswald font-medium">
                        Order Amount
                    </span>
                    <span className="font-oswald font-medium ">
                        ₹{order.totalAmount?.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="pt-4 flex w-full items-end justify-end">
                <span
                    onClick={handleClickOpen}
                    className="bg-red-600 text-white py-1 px-3 sm:py-2 text-sm rounded font-normal hover:bg-red-600 hover:text-white cursor-pointer"
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
