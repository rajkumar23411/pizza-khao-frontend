import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import AccountNav from "../components/AccountNav";
import SingleWishListItem from "../components/SingleWishListItem";
import { useDispatch, useSelector } from "react-redux";
import toaster from "react-hot-toast";
import { addToCart } from "../redux/actions/cartActions";
import PageHead from "../components/PageHead";
import Loader from "../components/Loader";
import EmptyFavs from "../components/EmptyFavs";
import HomeFooter from "./../components/HomeFooter";
import { useMediaQuery } from "@mui/material";
import {
    getWishlist,
    removeFromWishlist,
} from "../redux/actions/wishListAction";
import {
    CLEAR_ERRORS,
    RESET_WISHLIST_STATE,
} from "../redux/constants/wishListConstant";

const WishList = () => {
    const {
        loading,
        wishlist,
        success: wishlistSuccess,
        message: wishlistMessage,
        error: wishlistError,
    } = useSelector((state) => state.wishlist);
    const [wishlistItems, setWishlistItems] = useState([]);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    const handleRemoveFromWishlist = (id) => {
        let newWishlist = [...wishlistItems];
        newWishlist = newWishlist.filter((item) => item.product._id !== id);
        setWishlistItems(newWishlist);
        dispatch(removeFromWishlist(id));
    };
    const handleAddtoCart = (id, count, size) => {
        dispatch(addToCart(id, count, size));
    };
    useEffect(() => {
        if (wishlistSuccess) {
            toaster.success(wishlistMessage);
            dispatch({ type: RESET_WISHLIST_STATE });
        }
        if (wishlistError) {
            toaster.error(wishlistError);
            dispatch({ type: CLEAR_ERRORS });
        }
    }, [wishlistSuccess, wishlistMessage, dispatch, wishlistError]);
    useEffect(() => {
        if (!loading && wishlist) {
            setWishlistItems(wishlist?.items?.map((item) => item));
        }
    }, [loading, wishlist]);
    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

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
                    <h1 className="uppercase text-golden font-semibold tracking-wider font-oswald text-xl">
                        My Favourites
                        {wishlistItems?.length > 0 || wishlist !== null ? (
                            <>({wishlistItems?.length})</>
                        ) : null}
                    </h1>
                    {loading ? (
                        <Loader />
                    ) : wishlistItems?.length === 0 || wishlist === null ? (
                        <EmptyFavs />
                    ) : (
                        <div className="grid grid-cols-1 gap-2">
                            {wishlistItems?.map((item) => (
                                <SingleWishListItem
                                    key={item._id}
                                    item={item}
                                    handleRemoveFromWishlist={
                                        handleRemoveFromWishlist
                                    }
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
