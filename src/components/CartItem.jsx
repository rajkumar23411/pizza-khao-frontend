import React from "react";
import { pizzaSize } from "../utils";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCart } from "../redux/actions/cartActions";
import { addRemoveFromWishlist } from "../redux/actions/wishListAction";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
const CartItem = ({ item, wishlist }) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = (id) => {
    dispatch(removeCartItem(id));
  };
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
      className="flex flex-col gap-4 h-max border-2 p-5 rounded"
      key={item.product._id}
    >
      <div className="flex items-start gap-6 h-full">
        <div className="flex items-center justify-center flex-col gap-4 h-full">
          <img
            src={item?.product?.image}
            alt="pizza"
            className="h-28 w-28 object-cover rounded-md drop-shadow-md"
          />
          <div className="flex items-center justify-between gap-4">
            <select
              className="capitalize border-[1px] border-gray-500 p-1 text-gray-600 rounded-sm font-light cursor-pointer"
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
                  className="capitalize font-light cursor-pointer"
                >
                  {size}
                </option>
              ))}
            </select>
            <div className="flex gap-1 border-[1px] border-gray-500 rounded-sm py-1">
              <select
                value={item.quantity}
                onChange={(e) =>
                  handleSizeChange(item.product._id, e.target.value, item.size)
                }
                className="cursor-pointer"
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
          <div className="flex flex-col gap-1">
            <span className="text-gray-700 font-medium uppercase tracking-wider text-base">
              {item.product.name}
            </span>
            {item && item.product && item.product.prices && (
              <span className="text-golden font-medium text-lg">
                ₹{item.product.prices[item.size]}
              </span>
            )}
            <span className="capitalize text-gray-600 text-sm font-light">
              {item.size}
            </span>
            <span className="text-gray-600 text-sm font-light">
              Quantity: {item.quantity}
            </span>
          </div>
          <div className="flex flex-col items-end justify-between h-40">
            {item.product && item.product.prices && (
              <div className="text-red-600 text-xl font-semibold">
                ₹{item.quantity * item.product.prices[item.size]}
              </div>
            )}
            <div className="flex items-center gap-4">
              <span onClick={() => moveToWishlist(item.product._id)}>
                {isItemInWishlist(item.product._id) ? (
                  <span className="bg-gray-100 rounded-sm p-2 cursor-pointer hover:bg-gray-200">
                    <FavoriteRoundedIcon
                      fontSize="small"
                      className="text-red-600"
                    />
                  </span>
                ) : (
                  <span className="text-base flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-200 text-gray-600 font-normal p-2 rounded cursor-pointer">
                    <FavoriteBorderRoundedIcon fontSize="small" />
                    Add to favourite
                  </span>
                )}
              </span>
              <span
                className="text-base flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-normal p-2 rounded cursor-pointer"
                onClick={() => handleRemoveProduct(item.product._id)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
                Remove
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
