import React from "react";
import { pizzaSize } from "../utils";
import WishlistState from "./WishlistState";

const CartItem = ({
    item,
    wishlist,
    handleRemoveCartItem,
    handleCartUpdate,
}) => {
    // to update the cart
    return (
        <div
            className="bg-white border border-gray-200 rounded-md w-44 sm:w-52 md:w-60 h-max flex flex-col overflow-hidden
         relative"
        >
            <WishlistState wishlist={wishlist} product={item.product._id} />
            <button
                className="fas fa-trash text-gray-400 absolute left-3 top-3 hover:text-gray-600 h-8 w-8 bg-white rounded-full"
                title="Remove product from cart"
                onClick={() => handleRemoveCartItem(item.product._id)}
            />
            <div className="w-full h-28 sm:h-32 flex items-center">
                <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="bg-slate-50 p-2">
                <h1 className="text-base sm:text-lg text-gray-800 uppercase font-oswald">
                    {item.product?.name}
                </h1>
                <h1 className="text-golden font-oswald font-medium text-sm sm:text-base">
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
                    <span className="text-golden font-oswald font-medium">
                        ₹{item.quantity * item.product?.prices?.[item.size]}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                    <select
                        value={item.size}
                        onChange={(e) =>
                            handleCartUpdate(
                                item.product._id,
                                item.quantity,
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-300 h-8 capitalize text-sm rounded"
                    >
                        {pizzaSize.map((size) => (
                            <option value={size} key={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <select
                        value={item.quantity}
                        className="w-full border border-gray-300 h-8 text-sm rounded"
                        onChange={(e) =>
                            handleCartUpdate(
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
