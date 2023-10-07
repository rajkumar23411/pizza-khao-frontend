import React from "react";
import { pizzaSize } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCart } from "../redux/actions/cartActions";
import { addRemoveFromWishlist } from "../redux/actions/wishListAction";
import { useMediaQuery } from "@mui/material";
const CartItem = ({ item, coupon }) => {
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishlist);
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    // to delete the item from cart
    const handleRemoveProduct = (id) => {
        dispatch(removeCartItem(id));
    };
    // to move the item to wishlist
    const moveToWishlist = (id) => {
        dispatch(addRemoveFromWishlist(id));
    };
    // to check if the item is in wishlist
    const isItemInWishlist = (id) => {
        return wishlist?.items?.find((item) => item.product._id === id);
    };
    // to update the cart
    const handleCartChange = (id, quantity, size) => {
        dispatch(updateCart(id, quantity, size));
    };
    return (
        <div
            className="bg-white border border-gray-300 rounded-lg w-44 sm:w-52 md:w-60 h-max flex flex-col gap-4 overflow-hidden p-2 sm:p-4
         relative"
        >
            <button
                onClick={() => moveToWishlist(item?.product._id)}
                className="absolute top-3 left-3 h-7 w-7 flex items-center justify-center rounded-full cursor-pointer bg-white"
            >
                <i
                    className={` ${
                        isItemInWishlist(item?.product?._id)
                            ? "fas text-red-600 sm:text-lg md:text-xl"
                            : "fal"
                    } fa-heart`}
                ></i>
            </button>
            <button
                onClick={() => handleRemoveProduct(item.product._id)}
                className="absolute top-3 right-3"
            >
                <i className="fal fa-trash-alt text-red-700 sm:text-lg md:text-xl"></i>
            </button>
            <div className="w-full h-28 sm:h-32">
                <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="h-full w-full object-contain"
                />
            </div>
            <div>
                <h1 className="text-base sm:text-lg text-gray-800 uppercase">
                    {item.product?.name}
                </h1>
                <h1 className="text-red-600 font-medium text-sm sm:text-base">
                    ₹{item.product?.prices?.[item.size]}
                </h1>
                <div className="flex gap-6">
                    <p className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                        <span>Size:</span>
                        <span className="capitalize">{item.size}</span>
                    </p>
                    <p className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                        <span>Quantity: </span>
                        <span>{item.quantity}</span>
                    </p>
                </div>
                <div className="flex gap-1 text-xs sm:text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-red-700 font-medium">
                        ₹{item.quantity * item.product?.prices?.[item.size]}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                    <select
                        value={item.size}
                        onChange={(e) =>
                            handleCartChange(
                                item.product._id,
                                item.quantity,
                                e.target.value
                            )
                        }
                        className="capitalize text-gray-600 w-full border border-gray-400 rounded h-8"
                    >
                        {pizzaSize.map((size) => (
                            <option value={size} key={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <select
                        value={item.quantity}
                        className="text-gray-600 w-full border border-gray-400 rounded h-8"
                        onChange={(e) =>
                            handleCartChange(
                                item.product._id,
                                e.target.value,
                                item.size
                            )
                        }
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (quantity) => (
                                <option value={quantity} key={quantity}>
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
