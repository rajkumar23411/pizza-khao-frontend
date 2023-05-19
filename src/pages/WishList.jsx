import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import AccountNav from "../components/AccountNav";
import SingleWishListItem from "../components/SingleWishListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveFromWishlist,
  getWishlist,
} from "../redux/actions/wishListAction";
import toaster from "react-hot-toast";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { addToCart, clearError } from "../redux/actions/cartActions";
import PageHead from "../components/PageHead";
import Loader from "../components/Loader";
import EmptyFavs from "../components/EmptyFavs";
import HomeFooter from "./../components/HomeFooter";
import { useMediaQuery } from "@mui/material";

const WishList = () => {
  const { loading, wishlist, message } = useSelector((state) => state.wishlist);
  const { success, error } = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const handleRemoveFromWishlist = (id) => {
    dispatch(addRemoveFromWishlist(id));
  };
  const handleAddtoCart = (id, count, size) => {
    dispatch(addToCart(id, count, size));
  };
  useEffect(() => {
    if (message) {
      toaster.success(message);
      dispatch({ type: RESET_ADD_TO_FAVOURITE });
    }
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    if (success) {
      toaster.success("Item added to cart");
      dispatch({ type: ADD_TO_CART_RESET });
    }
    dispatch(getWishlist());
  }, [dispatch, message, error, success, toaster]);

  return (
    <>
      <section>
        <div>
          <MainNav />
        </div>
        <PageHead pageName={"My Account / Favourites"} />
      </section>
      <section className="flex items-start gap-4 lg:p-20 md:px-5 md:py-10 bg-slate-50 h-max lg:min-h-screen md:min-h-max">
        <AccountNav isSmallScreen={isSmallScreen} />
        <div className="flex-1 bg-white shadow-md md:p-10 flex flex-col md:min-h-[33.3rem] lg:min-h-full gap-6 rounded-md p-4">
          <h1 className="uppercase text-golden font-semibold tracking-wider text-xl">
            Favourites ({wishlist?.items?.length})
          </h1>
          {loading ? (
            <Loader />
          ) : wishlist?.items?.length === 0 ? (
            <EmptyFavs />
          ) : (
            <div className="grid lg:grid-cols-4 grid-cols-3 sm:grid-cols-2 gap-y-6 lg:gap-8 md:gap-4 w-full place-content-center justify-items-center">
              {wishlist?.items?.map((item) => (
                <SingleWishListItem
                  key={item._id}
                  item={item}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                  handleAddtoCart={handleAddtoCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <HomeFooter />
    </>
  );
};

export default WishList;
