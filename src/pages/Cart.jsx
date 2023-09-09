import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getCartItems } from "../redux/actions/cartActions";
import HomeFooter from "../components/HomeFooter";
import toaster from "react-hot-toast";
import {
    REMOVE_CART_ITEM_RESET,
    UPDATE_CART_RESET,
} from "../redux/constants/cartConstant";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import { getWishlist } from "../redux/actions/wishListAction";
import PageHead from "../components/PageHead";
import EmptyCart from "../components/EmptyCart";
import CartLoader from "../components/CartLoader";
const PriceSectionHeader = ({ name }) => {
    return (
        <span
            className={`text-lg capitalize ${
                name === "Total" && "text-xl font-semibold"
            }`}
        >
            {name}
        </span>
    );
};
const PriceSectionAmount = ({ amount, isTotal }) => {
    return (
        <span
            className={`text-lg capitalize text-gray-700 ${
                isTotal && "text-xl font-semibold"
            }`}
        >
            ₹{amount}
        </span>
    );
};
const Cart = () => {
    const { loading, cart, error, success, message } = useSelector(
        (state) => state.myCart
    );
    const { message: wishListMessage } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishListMessage) {
            toaster.success(wishListMessage);
            dispatch({ type: RESET_ADD_TO_FAVOURITE });
        }
        dispatch(getWishlist());
    }, [wishListMessage, dispatch]);

    useEffect(() => {
        if (error) {
            toaster.error(error);
            clearError();
        }
        if (success) {
            toaster.success("Cart updated");
            dispatch({ type: UPDATE_CART_RESET });
        }
        if (message) {
            toaster.success(message);
            dispatch({ type: REMOVE_CART_ITEM_RESET });
        }
        dispatch(getCartItems());
    }, [dispatch, error, message, wishListMessage, success]);

    const totalPrice = cart && cart.totalPrice;
    const tax = cart && Number((cart.totalPrice / 100) * 5);
    const shipping = cart && Number(cart.totalPrice <= 300 ? 50 : 0);
    const total = Number(totalPrice + tax + shipping);
    return (
        <section className="bg-neutral-50">
            <section>
                <MainNav />
            </section>
            <PageHead pageName={"My Cart"} />
            {loading ? (
                <CartLoader />
            ) : (
                <>
                    {cart?.items?.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <section className="flex min-h-[40rem]">
                            <div className="flex-1  flex flex-col gap-6">
                                <div className="w-full p-6">
                                    <h1 className="text-2xl uppercase text-golden font-medium">
                                        Cart Items ({cart?.items?.length})
                                    </h1>
                                    <div className="grid grid-cols-4 mt-6 gap-y-8">
                                        {cart?.items?.map((item) => (
                                            <CartItem
                                                key={item.product?._id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full p-6">
                                    <h1 className="text-2xl uppercase text-golden font-medium">
                                        complete your meal
                                    </h1>
                                </div>
                            </div>
                            <div className="flex-[0.35] flex flex-col items-center mt-10 gap-10">
                                <div className="flex flex-col text-center w-[90%] bg-white px-4 py-6 shadow-md rounded-lg gap-2">
                                    <h1 className="text-2xl text-golden uppercase font-semibold border-b-2 py-2 border-dashed border-golden">
                                        Cart Total
                                    </h1>
                                    <div className="flex justify-between mt-4">
                                        <PriceSectionHeader name="Subtotal" />
                                        <PriceSectionAmount
                                            amount={totalPrice?.toFixed(2)}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Tax" />
                                        <PriceSectionAmount
                                            amount={tax.toFixed(2)}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Shipping" />
                                        <PriceSectionAmount
                                            amount={shipping.toFixed(2)}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Total" />
                                        <PriceSectionAmount
                                            amount={total.toFixed(2)}
                                            isTotal={true}
                                        />
                                    </div>
                                    <div className="mt-6 flex flex-col w-full gap-4">
                                        <Link
                                            to="/menu"
                                            className="h-12 border flex items-center justify-center border-gray-400 rounded-md uppercase bg-slate-100 text-gray-600 hover:border-gray-800 hover:text-gray-800"
                                        >
                                            Continue Shopping
                                        </Link>
                                        <Link
                                            to="/checkout"
                                            className="h-12 flex items-center justify-center bg-red-600 text-white rounded-md uppercase hover:bg-red-700"
                                        >
                                            Checkout Now
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-center w-[90%] justify-between text-center gap-2  bg-white p-4 shadow-md rounded-lg cursor-pointer">
                                    <div className="flex gap-4 items-center">
                                        <div className="fas fa-badge-percent text-xl text-green-600"></div>
                                        <div className="text-left">
                                            <h1>Select offer / Apply coupon</h1>
                                            <span className="text-sm font-light">
                                                Get discount with your order
                                            </span>
                                        </div>
                                    </div>
                                    <div className="fas fa-chevron-right"></div>
                                </div>
                            </div>
                        </section>
                    )}
                    <HomeFooter />
                </>
            )}
        </section>
    );
};

export default Cart;
