import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toaster from "react-hot-toast";
import {
    CLEAR_ERRORS,
    RESET_WISHLIST_STATE,
} from "../redux/constants/wishListConstant";
import {
    addToWishlist,
    removeFromWishlist,
} from "../redux/actions/wishListAction";
const WishlistState = ({ product, wishlist }) => {
    const dispatch = useDispatch();
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        // Update favs when wishlist changes
        if (wishlist) {
            setFavs(wishlist.items?.map((item) => item.product?._id) || []);
        }
    }, [wishlist]);

    const { success, message, error } = useSelector((state) => state.wishlist);

    const checkIsAddedToWishlist = () => {
        return favs.includes(product);
    };

    const handleAddToFavourite = () => {
        let newFavs = [...favs];

        if (checkIsAddedToWishlist()) {
            newFavs = newFavs.filter((id) => id !== product);
            dispatch(removeFromWishlist(product));
        } else {
            newFavs.push(product);
            dispatch(addToWishlist(product));
        }

        setFavs(newFavs);
    };

    useEffect(() => {
        // Reset wishlist state after the action is dispatched
        if (success || error) {
            dispatch({ type: RESET_WISHLIST_STATE });
        }
    }, [success, error, dispatch]);
    return (
        <div
            className="h-8 w-8 rounded-full absolute right-3 top-3 grid place-items-center cursor-pointer group bg-white"
            title="Add to favourite"
            onClick={handleAddToFavourite}
        >
            <i
                className={`${
                    checkIsAddedToWishlist()
                        ? "fas fa-heart text-red-500"
                        : "fal fa-heart text-gray-500"
                } text-xl group-hover:scale-125 transition-all duration-150 ease-in-out`}
            />
        </div>
    );
};

export default WishlistState;
