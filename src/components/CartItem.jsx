import React from "react";
import { pizzaSize } from "../utils";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCart } from "../redux/actions/cartActions";
import { addRemoveFromWishlist } from "../redux/actions/wishListAction";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useMediaQuery } from "@mui/material";
const CartItem = ({ item, wishlist }) => {
  const dispatch = useDispatch();
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
    <div
      className="flex flex-col h-[8rem] lg:h-52 md:h-44 border-2 p-2 lg:p-5 md:p-3 rounded"
      key={item.product._id}
    >
      <div className="flex items-start lg:gap-6 md:gap-2 h-full">
        <div className="flex flex-col items-center justify-between h-full lg:gap-4 relative">
          <div className="h-20 w-20 lg:h-28 lg:w-28 md:h-24 md:w-24 rounded-md overflow-hidden drop-shadow-md">
            <img
              src={item?.product?.image}
              alt={item?.product?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <select
              className="capitalize border-[1px] border-gray-500 sm:p-1 text-gray-600 rounded-sm font-light cursor-pointer text-xs sm:text-base bg-transparent"
              value={item.size}
              onChange={(e) =>
                handleSizeChange(
                  item.product._id,
                  item.quantity,
                  e.target.value
                )
              }
            >
              {pizzaSize.map((size, i) => (
                <option
                  value={size}
                  key={i}
                  className="capitalize font-light cursor-pointer md:text-sm lg:text-base"
                >
                  {size}
                </option>
              ))}
            </select>
            <div className="flex gap-1 border-[1px] border-gray-500 rounded-sm sm:py-1 overflow-hidden bg-transparent">
              <select
                value={item.quantity}
                onChange={(e) =>
                  handleSizeChange(item.product._id, e.target.value, item.size)
                }
                className="cursor-pointer text-xs sm:text-base bg-transparent"
              >
                {Array.from(Array(10).keys()).map((x, i) => (
                  <option
                    key={i}
                    value={i + 1}
                    className="cursor-pointer hover:bg-red-600"
                  >
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => moveToWishlist(item?.product._id)}
            className="absolute -left-1 -top-0 bg-white h-6 md:h-8 w-6 md:w-8 flex items-center justify-center rounded-full"
          >
            <i
              className={`${
                isItemInWishlist(item?.product._id)
                  ? "fas fa-heart text-red-600"
                  : "far fa-heart"
              } text-sm md:text-base lg:text-lg`}
            ></i>
          </button>
        </div>
        <div className="flex items-start justify-between w-full h-full">
          <div className="flex flex-col sm:gap-1">
            <span className="text-gray-700 font-medium uppercase tracking-wider text-sm sm:text-base">
              {isSmallScreen
                ? item.product.name.length > 15
                  ? `${item.product.name.slice(0, 12)}...`
                  : item.product.name
                : item.product.name}
            </span>
            {item && item.product && item.product.prices && (
              <span className="text-golden font-medium text-sm sm:text-lg">
                ₹{item.product.prices[item.size]}
              </span>
            )}
            <span className="capitalize text-gray-600 text-xs sm:text-sm font-light">
              {item.size}
            </span>
            <span className="text-gray-600 text-xs sm:text-sm font-light">
              Quantity: {item.quantity}
            </span>
          </div>
          <div className="flex flex-col items-end justify-between h-full">
            {item?.product?.prices && (
              <div className="text-red-600 text-base md:text-xl font-semibold">
                ₹{item.quantity * item.product.prices[item.size]}
              </div>
            )}
            <button
              className="text-xs sm:text-base uppercase text-blue-600 font-normal rounded cursor-pointer"
              onClick={() => handleRemoveProduct(item.product._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
