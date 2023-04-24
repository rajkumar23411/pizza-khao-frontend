import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getCartItems,
  removeCartItem,
} from "../redux/actions/cartActions";
import { REMOVE_CART_ITEM_RESET } from "../redux/constants/cartConstant";

const OrderedItems = ({ items }) => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.myCart);

  const handleDeleteItem = (id) => {
    dispatch(removeCartItem(id));
  };

  useEffect(() => {
    if (message) {
      dispatch({ type: REMOVE_CART_ITEM_RESET });
      dispatch(getCartItems());
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, message]);
  return items.map((item) => (
    <div className="flex items-start gap-8 border-b-[1px] px-8 py-4">
      <div className="flex flex-col items-start justify-start gap-3 w-max">
        <div className="h-24 w-24">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col">
          <p className="uppercase font-medium text-golden tracking-wide">
            {item.product.name}
          </p>
          <p className="text-sm text-gray-600 capitalize">{item.size}</p>
          <p className="text-sm text-gray-600"> {item.quantity}</p>
          <p className="text-red-600 font-semibold text-lg">
            ₹{item.quantity * item.product.prices[item.size]}
          </p>
        </div>
        <div
          className="text-blue-500 font-normal cursor-pointer mt-2 uppercase hover:text-blue-700"
          onClick={() => handleDeleteItem(item.product._id)}
        >
          Remove
        </div>
      </div>
    </div>
  ));
};

export default OrderedItems;
