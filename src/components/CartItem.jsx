import React from "react";
import { pizzaSize } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCart } from "../redux/actions/cartActions";
import { addRemoveFromWishlist } from "../redux/actions/wishListAction";
import { useMediaQuery } from "@mui/material";
const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);
    const handleRemoveProduct = (id) => {
        dispatch(removeCartItem(id));
    };
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    const moveToWishlist = (id) => {
        dispatch(addRemoveFromWishlist(id));
    };
    const isItemInWishlist = (id) => {
        return wishlist?.items?.find((item) => item.product._id === id);
    };
    const handleSizeChange = (id, quantity, size) => {
        dispatch(updateCart(id, quantity, size));
    };
    return (
        <div className="bg-white rounded-lg w-60 h-max flex flex-col gap-4 overflow-hidden px-6 py-2 relative drop-shadow">
            <button
                onClick={() => moveToWishlist(item?.product._id)}
                className="absolute top-3 left-3 h-7 w-7 bg-neutral-50 shadow-md flex items-center justify-center rounded-full cursor-pointer"
            >
                <i
                    className={` ${
                        isItemInWishlist(item?.product?._id)
                            ? "fas text-red-600"
                            : "fal"
                    } fa-heart`}
                ></i>
            </button>
            <button
                onClick={() => handleRemoveProduct(item.product._id)}
                className="absolute top-3 right-3"
            >
                <i className="fal fa-trash-alt text-red-700 text-lg"></i>
            </button>
            <div className="w-full h-32">
                <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="h-full w-full object-contain"
                />
            </div>
            <div>
                <h1 className="text-lg font-medium capitalize text-gray-800">
                    {item.product?.name}
                </h1>
                <p className="text-sm text-gray-600 font-light">
                    {item.product?.description?.substring(0, 35)}...
                </p>
                <h1 className="text-red-600 font-medium">
                    ₹{item.product?.prices?.[item.size]}
                </h1>
                <div className="flex gap-6">
                    <p className="flex items-center gap-1 text-gray-600 text-sm">
                        <span>Size:</span>
                        <span className="capitalize">{item.size}</span>
                    </p>
                    <p className="flex items-center gap-1 text-gray-600 text-sm">
                        <span>Quantity: </span>
                        <span>{item.quantity}</span>
                    </p>
                </div>
                <div className="flex gap-1 text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-red-700 font-medium">
                        ₹{item.quantity * item.product?.prices?.[item.size]}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                    <select
                        value={item.size}
                        onChange={(e) =>
                            handleSizeChange(
                                item.product._id,
                                item.quantity,
                                e.target.value
                            )
                        }
                        className="capitalize text-gray-600 w-full border border-gray-400 rounded-md h-8"
                    >
                        {pizzaSize.map((size) => (
                            <option
                                value={size}
                                key={size}
                                onClick={() =>
                                    handleSizeChange(
                                        item.product._id,
                                        item.quantity,
                                        size
                                    )
                                }
                            >
                                {size}
                            </option>
                        ))}
                    </select>
                    <select
                        value={item?.quantity}
                        className="text-gray-600 w-full border border-gray-400 rounded-md h-8"
                        onChange={(e) =>
                            handleSizeChange(
                                item.product._id,
                                item.quantity,
                                e.target.value
                            )
                        }
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (quantity) => (
                                <option
                                    value={quantity}
                                    key={quantity}
                                    onClick={() =>
                                        handleSizeChange(
                                            item.product._id,
                                            quantity,
                                            item.size
                                        )
                                    }
                                >
                                    {quantity}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
