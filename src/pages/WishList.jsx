import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import AccountNav from "../components/AccountNav";
import SingleWishListItem from "../components/SingleWishListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveFromWishlist,
  getWishlist,
} from "../redux/actions/wishListAction";
import { useSnackbar } from "notistack";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { addToCart, clearError } from "../redux/actions/cartActions";
import PageHead from "../components/PageHead";
import Loader from "../components/Loader";
import EmptyFavs from "../components/EmptyFavs";
import HomeFooter from "./../components/HomeFooter";

const WishList = () => {
  const { loading, wishlist, message } = useSelector((state) => state.wishlist);
  const { success, error } = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleRemoveFromWishlist = (id) => {
    dispatch(addRemoveFromWishlist(id));
  };
  const handleAddtoCart = (id, count, size) => {
    dispatch(addToCart(id, count, size));
  };
  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: RESET_ADD_TO_FAVOURITE });
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
    if (success) {
      enqueueSnackbar("Item added to cart", { variant: "success" });
      dispatch({ type: ADD_TO_CART_RESET });
    }
    dispatch(getWishlist());
  }, [dispatch, message, error, success, enqueueSnackbar]);

  return (
    <>
      <section>
        <div>
          <MainNav />
        </div>
        <PageHead pageName={"My Account / Favourites"} />
      </section>
      <section className="flex items-start gap-4 lg:p-20 md:px-5 md:py-10 bg-slate-50 lg:h-screen md:min-h-max">
        <AccountNav />
        <div className="flex-1 bg-white shadow-md p-10 flex flex-col min-h-full gap-6 rounded-md">
          <h1 className="uppercase text-golden font-semibold tracking-wider text-xl">
            Favourites ({wishlist?.items?.length})
          </h1>
          {loading ? (
            <Loader />
          ) : wishlist?.items?.length === 0 ? (
            <EmptyFavs />
          ) : (
            <div className="grid grid-cols-4 gap-8">
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
