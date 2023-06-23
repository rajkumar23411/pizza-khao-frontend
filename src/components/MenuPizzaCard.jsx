import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuickViewModel from "../components/QuickViewModel";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveFromWishlist,
  getWishlist,
} from "../redux/actions/wishListAction";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import {
  addToCart,
  clearError,
  getCartItems,
} from "../redux/actions/cartActions";
import { motion, AnimatePresence } from "framer-motion";
import toaster from "react-hot-toast";
import QuickViewBtn from './Buttons/QuickViewBtn';
import AddToCartBtn from './Buttons/AddToCartBtn';

const MenuPizzaCard = ({ pizza }) => {
  const [open, setOpen] = useState(false);
  const { loading, success, error } = useSelector((state) => state.myCart);
  const { wishlist, message } = useSelector((state) => state.wishlist);
  const [modelItem, setModelItem] = useState({});
  const [loadingProductId, setLoadingProductId] = useState(null);
  const dispatch = useDispatch();

  const handleAddtoCart = (id, count, size) => {
    setLoadingProductId(id);
    dispatch(addToCart(id, count, size));
  };
  const handleAddtoFavourite = (id) => {
    dispatch(addRemoveFromWishlist(id));
  };
  const handleClickOpen = (item) => {
    setModelItem(item);
    setOpen(true);
  };

  const isItemInWishlist = (id) => {
    return wishlist?.items?.find((item) => item.product._id === id);
  };

  useEffect(() => {
    if (success) {
      toaster.success("Item added to cart");
      dispatch({ type: ADD_TO_CART_RESET });
      setOpen(false);
      dispatch(getCartItems());
    }

    if (message) {
      toaster.success(message);
      dispatch({ type: RESET_ADD_TO_FAVOURITE });
    }

    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    dispatch(getWishlist());
  }, [success, dispatch, error, message]);
  return (
    <motion.div
      layout
      className="grid  lg:grid-cols-3 grid-cols-2 place-items-center place-content-start h-full md:mt-5 lg:m-0"
    >
      <AnimatePresence>
        {pizza?.map((item) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={item._id}
            className="flex flex-col lg:w-80 md:w-64 py-6 lg:gap-6 md:gap-4 pizza-box overflow-hidden cursor-pointer relative"
          >
            <div
              className={`absolute top-0 right-0 font-light cursor-pointer`}
              onClick={() => handleAddtoFavourite(item._id)}
            >
              {isItemInWishlist(item._id) ? (
                <FavoriteRoundedIcon
                  className="text-red-500"
                  fontSize="small"
                />
              ) : (
                <FavoriteBorderRoundedIcon
                  className="text-gray-400"
                  fontSize="small"
                />
              )}
            </div>
            <Link to={`/pizza/${item._id}`}>
              <div className="pizza-image w-full flex items-center justify-center">
                <div className="h-24 w-24 lg:w-60 md:h-48 lg:h-60 md:w-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center sm:gap-2">
                <p className="text-yellow-700 uppercase font-medium tracking-wider text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-base md:text-xl font-medium text-[#D2401E]">
                  ₹{item.prices.regular} - ₹{item.prices.extralarge}
                </p>
              </div>
            </Link>
            <div className="flex sm:flex-row items-center justify-center gap-2 text-sm md:text-xs mt-2 sm:mt-0">
              {loadingProductId === item._id && loading ? (
                <button disabled={true} className="text-xs sm:text-base flex items-center justify-center gap-2 bg-red-400 px-2 sm:px-6 py-2 sm:py-3 font-normal tracking-wider text-white uppercase rounded">
                  <i className="fas fa-spinner fa-spin text-xl"></i>Adding...
                </button>
              ) : (
                <AddToCartBtn handleClick={() => handleAddtoCart(item._id, 1, "regular")} main={true} />
              )}
              <QuickViewBtn handleClick={() => handleClickOpen(item)}/>
            </div>
            {open && (
              <QuickViewModel
                pizza={modelItem}
                onClose={() => setOpen(false)}
                isItemInWishlist={isItemInWishlist(item._id)}
                wishListItems={wishlist?.items}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuPizzaCard;
