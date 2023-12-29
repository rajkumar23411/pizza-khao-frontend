import React, { useCallback, useEffect, useState } from "react";
import HomeFooter from "../components/HomeFooter";
import MainNav from "../components/MainNav";
import PageHead from "../components/PageHead";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./../components/CartItem";
import axios from "axios";
import ComplementeryProductCard from "./../components/ComplementeryProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import toaster from "react-hot-toast";
import { UPDATE_CART_RESET } from "../redux/constants/cartConstant";
import { clearError, getCartItems } from "../redux/actions/cartActions";
import { getWishlist } from "../redux/actions/wishListAction";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import CartLoader from "./../components/CartLoader";
import EmptyCart from "./../components/EmptyCart";
import CouponSideBar from "../components/CouponSideBar";
import CouponApplied from "../components/CouponApplied";
import { getCoupons, removeCoupon } from "../redux/actions/couponAction";
import { RESET_COUPON } from "./../redux/constants/couponConstant";
const PriceSectionHeader = ({ name }) => {
    return (
        <span
            className={`text-lg capitalize ${
                name === "Total" && "text-xl font-medium"
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
                isTotal && "text-xl font-medium"
            }`}
        >
            ₹{amount}
        </span>
    );
};
const Cart = () => {
    const { loading, cart, success, error, message } = useSelector(
        (state) => state.myCart
    );
    const { isValidate, coupons } = useSelector((state) => state.coupon);
    const { message: wishListMessage } = useSelector((state) => state.wishlist);
    const [complementeryProduct, setComplementryProduct] = useState([]);
    const dispatch = useDispatch();
    const [showCouponMenu, setShowCouponMenu] = useState(false);
    const [showCouponAppliedSuccess, setShowCouponAppliedSuccess] =
        useState(false);
    const [showCheerUp, setShowCheerUp] = useState(true);
    const getComplementryProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/products/complementry`);
            if (data.success) {
                setComplementryProduct(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const totalPrice = cart && cart.totalPrice;
    const tax = cart && Number((cart.totalPrice / 100) * 5);
    const shipping = cart && Number(cart.totalPrice <= 300 ? 50 : 0);
    let total = Number(totalPrice + tax + shipping);
    const handleCouponMenu = () => {
        setShowCouponMenu(true);
    };
    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
    };
    useEffect(() => {
        document.addEventListener("click", (e) => {
            const couponMenu = document.querySelector(".couponMenu");
            if (
                e.target.classList.contains("showCouponBtn") ||
                couponMenu.contains(e.target)
            ) {
                return;
            }
            setShowCouponMenu(false);
        });
        if (isValidate) {
            setShowCouponMenu(false);
            setShowCouponAppliedSuccess(true);
            dispatch({ type: RESET_COUPON });
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        setTimeout(() => {
            setShowCouponAppliedSuccess(false);
            setShowCheerUp(false);
        }, 5000);
    }, [isValidate, showCheerUp, dispatch]);

    useEffect(() => {
        if (success) {
            toaster.success(message);
            dispatch({ type: UPDATE_CART_RESET });
        }
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
        if (wishListMessage) {
            toaster.success(wishListMessage);
            dispatch({ type: RESET_ADD_TO_FAVOURITE });
        }
        getComplementryProducts();
        dispatch(getCartItems());
        dispatch(getWishlist());
        dispatch(getCoupons());
    }, [
        getComplementryProducts,
        success,
        error,
        message,
        dispatch,
        wishListMessage,
        isValidate,
    ]);
    return (
        <section className={`${showCouponAppliedSuccess && "overflow-hidden"}`}>
            {showCouponAppliedSuccess && <CouponApplied />}
            <MainNav />
            <PageHead pageName={"My Cart"} />
            <>
                {loading ? (
                    <CartLoader />
                ) : cart?.items?.length <= 0 ? (
                    <EmptyCart />
                ) : (
                    <section className="p-2 sm:p-6 flex flex-col md:flex-row items-start justify-between gap-10">
                        <div className="w-full sm:w-[74%] flex flex-col gap-10">
                            <div className="flex flex-col gap-6">
                                <h1 className="uppercase text-2xl text-golden">
                                    Cart items ({cart?.items?.length})
                                </h1>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-3 sm:gap-y-4 md:gap-y-6">
                                    {cart?.items?.map((item) => (
                                        <CartItem key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <h1 className="text-2xl text-golden uppercase">
                                    Complete your meal
                                </h1>
                                <div>
                                    <Swiper
                                        modules={[Navigation]}
                                        slidesPerView={5}
                                        navigation={true}
                                        breakpoints={{
                                            300: {
                                                slidesPerView: 3,
                                            },
                                            640: {
                                                slidesPerView: 4,
                                                spaceBetween: 20,
                                            },
                                            780: {
                                                slidesPerView: 4,
                                                spaceBetween: 60,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                        className="mySwiper"
                                    >
                                        {complementeryProduct?.length > 0 &&
                                            complementeryProduct.map(
                                                (product) => (
                                                    <SwiperSlide
                                                        key={product._id}
                                                    >
                                                        <ComplementeryProductCard
                                                            product={product}
                                                        />
                                                    </SwiperSlide>
                                                )
                                            )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-[26%] flex flex-col gap-4 sm:gap-10">
                            <div className="bg-slate-50 p-6 rounded-lg mt-2 sm:mt-14">
                                <h1 className="uppercase text-2xl border-b-2 border-dashed border-golden text-golden text-center">
                                    Cart Total
                                </h1>
                                <div className="flex flex-col gap-2 mt-10">
                                    <div className="flex justify-between">
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
                                        <div>
                                            {shipping === 0 ? (
                                                <div>
                                                    <span className="line-through text-gray-400">
                                                        ₹50.00
                                                    </span>
                                                    &nbsp;
                                                    <span className="text-blue-600">
                                                        free
                                                    </span>
                                                </div>
                                            ) : (
                                                <PriceSectionAmount
                                                    amount={shipping.toFinxed(
                                                        2
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Total" />
                                        <PriceSectionAmount
                                            amount={total.toFixed(2)}
                                            isTotal={true}
                                        />
                                    </div>
                                    {cart.coupon && (
                                        <>
                                            <div className="text-sm mt-2 flex items-start gap-1">
                                                <p className="font-medium text-2xl text-red-700">
                                                    *
                                                </p>
                                                <p className="font-roboto text-red-700 font-medium">
                                                    You are saving &nbsp;
                                                    <span className="text-base font-roboto">
                                                        ₹
                                                        {Math.round(
                                                            cart.discountAmount
                                                        )}
                                                    </span>
                                                    &nbsp;including&nbsp;
                                                    <span className="text-base font-roboto">
                                                        FREE
                                                    </span>
                                                    &nbsp; delivery in this
                                                    order
                                                </p>
                                            </div>
                                            <div className="border bg-red-50 border-red-400 rounded-lg flex items-center justify-between mt-6 overflow-hidden px-4 py-2 bg-cheer-up relative">
                                                {showCheerUp && (
                                                    <img
                                                        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/Fireworks%20Sticker%20by%20HostNetDirect%20for%20iOS%20&%20Android%20_%20GIPHY.gif?updatedAt=1696595884779)"
                                                        alt="cheer"
                                                        className="absolute h-full w-full object-cover"
                                                    />
                                                )}
                                                <p className="font-roboto">
                                                    <span className="fas fa-tags mr-2 text-red-700 text-xl"></span>
                                                    <span className="uppercase text-red-700 font-medium">
                                                        {cart.coupon.code}
                                                    </span>
                                                    &nbsp; is applied
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveCoupon()
                                                    }
                                                    className="fal fa-times text-xl text-red-700 cursor-pointer hover:rotate-90 hover:scale-110"
                                                ></button>
                                            </div>
                                        </>
                                    )}
                                    <div className="mt-6 flex flex-col w-full gap-4">
                                        <Link
                                            to="/menu"
                                            className="h-12 bg-blue-500 grid place-items-center cursor-pointer text-white rounded-md uppercase hover:bg-blue-600"
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
                            </div>
                            <div
                                onClick={(e) => handleCouponMenu(e)}
                                className="showCouponBtn flex items-center w-full justify-between text-center gap-2 bg-white p-4 shadow-md rounded-lg cursor-pointer border border-gray-200"
                            >
                                <div className="flex gap-4 items-center ">
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
            </>
            <HomeFooter />
            {showCouponMenu && (
                <CouponSideBar
                    showCouponMenu={showCouponMenu}
                    handleClose={() => setShowCouponMenu(false)}
                    coupons={coupons && coupons}
                />
            )}
        </section>
    );
};

export default Cart;
