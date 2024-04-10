import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearError,
    getCartItems,
    removeCartItem,
} from "../redux/actions/cartActions";
import { REMOVE_CART_ITEM_RESET } from "../redux/constants/cartConstant";
import toaster from "react-hot-toast";

const OrderedItems = ({ items }) => {
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.myCart);

    const handleDeleteItem = (id) => {
        dispatch(removeCartItem(id));
    };

    useEffect(() => {
        if (message) {
            toaster.success(message);
            dispatch({ type: REMOVE_CART_ITEM_RESET });
            dispatch(getCartItems());
        }
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
        dispatch(getCartItems());
    }, [dispatch, message, error]);

    return items.map((item) => (
        <div className="flex items-start gap-4 sm:gap-8 border-b-[1px] py-2 lg:px-8 lg:py-4 md:p-4">
            <div className="flex flex-col items-start justify-start gap-3 w-max">
                <div className="h-16 w-16 sm:h-24 sm:w-24 flex items-center justify-center">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col">
                    <p className="uppercase font-medium font-oswald text-golden tracking-wide text-sm sm:text-base">
                        {item.product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 capitalize">
                        {item.size}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                        {item.quantity}
                    </p>
                    <p className="text-gray-700 font-medium font-oswald">
                        ₹{item.quantity * item.product.prices[item.size]}
                    </p>
                </div>
                <button
                    className="text-red-500 hover:text-red-600 text-sm tracking-tight font-roboto font-medium"
                    onClick={() => handleDeleteItem(item.product._id)}
                >
                    Remove
                </button>
            </div>
        </div>
    ));
};

export default OrderedItems;
