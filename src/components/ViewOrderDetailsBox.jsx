import { Close } from "@mui/icons-material";
import React from "react";
import OrderDetails from "./OrderDetails";
import OrderItemBox from "./OrderItemBox";
import OrderPriceDetails from "./OrderPriceDetails";
import DownloadIcon from "@mui/icons-material/Download";
const ViewOrderDetailsBox = ({ onClose, order }) => {
  return (
    <div className="flex flex-col">
      <OrderDetails order={order} onClose={onClose} />
      <div className="p-4">
        <h1 className="text-golden font-semibold text-sm sm:text-base uppercase tracking-wider mb-4 border-b-2 border-dashed">
          Ordered Item
        </h1>
        <div>
          {order?.items.map((item) => (
            <OrderItemBox item={item} key={item.productId._id} />
          ))}
        </div>
      </div>
      <OrderPriceDetails order={order} />
      <div className="border-[1px] m-2 border-gray-400 font-normal text-center text-xs sm:text-base py-1 rounded cursor-pointer hover:border-gray-600">
        <span>Download Invoice</span>
        <DownloadIcon fontSize="small" className="text-gray-700" />
      </div>
    </div>
  );
};

export default ViewOrderDetailsBox;
