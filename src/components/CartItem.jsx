import React from "react";
import { pizzaSize } from "../utils";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
        <div className="flex flex-col items-center justify-between h-full lg:gap-4">
          <div className="h-20 lg:h-28 lg:w-28 md:h-24 md:w-24 rounded-md">
            <img
              src={item?.product?.image}
              alt="pizza"
              className="h-full w-full object-cover drop-shadow-md overflow-hidden"
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
                className="cursor-pointer text-xs sm:text-base"
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
        </div>
        <div className="flex items-start justify-between w-full h-full">
          <div className="flex flex-col sm:gap-1">
            <span className="text-gray-700 font-medium uppercase tracking-wider text-sm sm:text-base">
              {item.product.name}
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
              <div className="text-red-600 text-xl font-semibold">
                ₹{item.quantity * item.product.prices[item.size]}
              </div>
            )}
            <div
              className={`flex items-center ${
                isSmallScreen ? "gap-0" : "gap-4"
              }`}
            >
              <span onClick={() => moveToWishlist(item.product._id)}>
                {isItemInWishlist(item.product._id) ? (
                  <span
                    className={`${
                      isSmallScreen
                        ? "bg-transparent"
                        : "bg-gray-50 hover:bg-gray-200"
                    } rounded-sm p-2 cursor-pointer `}
                  >
                    <FavoriteRoundedIcon
                      fontSize="small"
                      className="text-red-600"
                    />
                  </span>
                ) : (
                  <span
                    className={`text-base lg:flex items-center justify-center gap-1 ${
                      isSmallScreen
                        ? "bg-transparent"
                        : "bg-gray-50 hover:bg-gray-200"
                    }  text-gray-600 font-normal p-2 rounded cursor-pointer`}
                  >
                    <FavoriteBorderRoundedIcon fontSize="small" />
                    <span className={isSmallScreen ? "hidden" : "block"}>
                      Add to favourite
                    </span>
                  </span>
                )}
              </span>
              <button
                className="text-xs sm:text-base flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-normal p-1 sm:p-2 rounded cursor-pointer"
                onClick={() => handleRemoveProduct(item.product._id)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
