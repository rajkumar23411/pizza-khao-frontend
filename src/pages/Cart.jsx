import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
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
import {
    REMOVE_CART_ITEM_RESET,
    UPDATE_CART_RESET,
} from "../redux/constants/cartConstant";
import {
    clearError,
    getCartItems,
    removeCartItem,
    updateCart,
} from "../redux/actions/cartActions";
import EmptyCart from "./../components/EmptyCart";
import CouponSideBar from "../components/CouponSideBar";
import CouponApplied from "../components/CouponApplied";
import { removeCoupon } from "../redux/actions/couponAction";
import { getWishlist } from "../redux/actions/wishListAction";
import { RESET_COUPON } from "../redux/constants/couponConstant";

const PriceSectionHeader = ({ name }) => {
    return (
        <span
            className={`${
                name === "Total" ? " font-medium uppercase" : "capitalize"
            } text-lg font-roboto `}
        >
            {name}
        </span>
    );
};
const PriceSectionAmount = ({ amount, isTotal }) => {
    return (
        <span
            className={`capitalize text-gray-700 text-lg ${
                isTotal && "font-medium font-roboto"
            }`}
        >
            ₹{amount}
        </span>
    );
};
const Cart = () => {
    const dispatch = useDispatch();

    const { isValidate, success, error, message } = useSelector(
        (state) => state.coupon
    );
    const { loading, cart } = useSelector((state) => state.myCart);
    const { wishlist } = useSelector((state) => state.wishlist);
    const [complementryProducts, setComplementryProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [showCouponMenu, setShowCouponMenu] = useState(false);
    const [showCheerUp, setShowCheerUp] = useState(true);

    let tax = cartTotal && (cartTotal / 100) * 8;
    let shipping = cartTotal && cartTotal <= 399 ? 49 : 0;
    let grandTotal = cartTotal && cartTotal + tax + shipping;

    const getComplementryProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/products/complementry`);
            if (data.success) {
                setComplementryProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon());
    };

    const handleRemoveCartItem = (id) => {
        const deletedItem = cartItems.find((item) => item.product._id === id);
        setCartItems(cartItems.filter((item) => item.product._id !== id));
        setCartTotal(
            cartTotal -
                deletedItem.quantity *
                    deletedItem.product?.prices[deletedItem.size]
        );
        toaster.success("Item removed from cart");
        dispatch({ type: REMOVE_CART_ITEM_RESET });
        dispatch(removeCartItem(id));
    };
    const setCartDetails = useCallback(() => {
        if (!loading && cart) {
            setCartTotal(cart?.totalPrice);
            setCartItems(cart?.items?.map((item) => item));
        }
    }, [loading, cart, setCartItems, setCartTotal]);

    useEffect(() => {
        setCartDetails();
    }, [loading, cart, setCartDetails]);

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
        }
        setTimeout(() => {
            setShowCheerUp(false);
        }, [5000]);
    }, [isValidate, showCheerUp]);

    useEffect(() => {
        if (success) {
            toaster.success(message);
            dispatch({ type: RESET_COUPON });
            dispatch(getCartItems());
        }
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
    }, [success, dispatch, error, message]);
    useEffect(() => {
        dispatch(getWishlist());
        getComplementryProducts();
    }, [getComplementryProducts, dispatch]);
    return (
        <>
            <MainNav />
            <PageHead pageName={"MY CART"} />
            <section className="flex gap-8 w-full p-6">
                <section className="w-[73%]">
                    {loading ? (
                        <div className="grid grid-cols-4 gap-2">
                            {Array(4)
                                .fill(null)
                                .map((_, indx) => (
                                    <Skeleton
                                        sx={{
                                            bgcolor: "grey.300",
                                        }}
                                        animation="wave"
                                        key={indx}
                                        variant="rectangular"
                                        width={240}
                                        height={220}
                                        className="rounded-xl"
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className="w-full">
                            <h1 className="text-3xl font-medium font-oswald text-gray-800 uppercase flex items-end gap-1">
                                <i className="far fa-shopping-basket text-3xl" />
                                <span>Cart items({cartItems?.length})</span>
                            </h1>
                            <div className="pt-6">
                                <div className="grid grid-cols-4 gap-2">
                                    {cartItems?.map((item) => (
                                        <CartItem
                                            key={item._id}
                                            item={item}
                                            handleRemoveCartItem={() =>
                                                handleRemoveCartItem(
                                                    item?.product._id
                                                )
                                            }
                                            wishlist={wishlist}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-full mt-10">
                        <div>
                            <h1 className="text-3xl font-medium font-oswald text-gray-800 uppercase">
                                Complete your meal
                            </h1>
                            <p className="text-gray-600">
                                Try adding our mouth watering drinks and
                                desserts😋
                            </p>
                        </div>
                        <div className="pt-6 w-full">
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
                                {complementryProducts?.length > 0 &&
                                    complementryProducts.map((product) => (
                                        <SwiperSlide key={product._id}>
                                            <ComplementeryProductCard
                                                product={product}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section className="w-[27%]">
                    {loading ? (
                        <Skeleton
                            sx={{
                                bgcolor: "grey.300",
                            }}
                            animation="wave"
                            variant="rectangular"
                            width={340}
                            height={400}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="w-full mt-16">
                            <div className="p-6 shadow-md border border-gray-200 rounded-lg">
                                <h1 className="uppercase text-gray-700 font-oswald font-medium text-2xl border-b-2 border-dashed border-gray-500 text-center">
                                    Cart Total
                                </h1>
                                <div className="flex flex-col gap-2 mt-10">
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Subtotal" />
                                        <PriceSectionAmount
                                            amount={cartTotal?.toFixed(2)}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Tax" />
                                        <PriceSectionAmount
                                            amount={tax?.toFixed(2)}
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <PriceSectionHeader name="Shipping" />
                                        <div>
                                            {shipping === 0 ? (
                                                <div className="flex items-center justify-center">
                                                    <p className="line-through text-gray-400">
                                                        ₹50.00
                                                    </p>
                                                    &nbsp;
                                                    <p className="flex items-center justify-center gap-1">
                                                        <span>₹0.00</span>
                                                        <span className="text-xs text-green-500 uppercase font-oswald">
                                                            (free)
                                                        </span>
                                                    </p>
                                                </div>
                                            ) : (
                                                <PriceSectionAmount
                                                    amount={shipping?.toFixed(
                                                        2
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-300 py-2">
                                        <PriceSectionHeader name="Total" />
                                        <PriceSectionAmount
                                            amount={grandTotal?.toFixed(2)}
                                            isTotal={true}
                                        />
                                    </div>
                                    {cart.coupon && (
                                        <>
                                            <div className="text-sm mt-2 flex items-start gap-1">
                                                <p className="font-medium text-2xl text-red-500">
                                                    *
                                                </p>
                                                <p className="font-roboto text-red-500 font-medium">
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
                                        </>
                                    )}
                                    <div className="mt-6 flex flex-col w-full gap-4">
                                        <Link
                                            to="/menu"
                                            className="bg-red-500 text-center py-3 w-full text-white rounded-md hover:bg-red-600"
                                        >
                                            Continue shopping
                                        </Link>
                                        <Link
                                            to="/checkout"
                                            className="bg-blue-500 text-white py-3 w-full text-center rounded-md hover:bg-blue-600"
                                        >
                                            Checkout now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {cart?.coupon ? (
                                <div className="mt-8 flex group items-center w-full justify-between text-center gap-2 bg-white h-20 px-4 shadow-md rounded-lg cursor-pointer border border-gray-200 bg-cheer-up relative overflow-hidden">
                                    {showCheerUp && (
                                        <img
                                            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/Fireworks%20Sticker%20by%20HostNetDirect%20for%20iOS%20&%20Android%20_%20GIPHY.gif?updatedAt=1696595884779)"
                                            alt="cheer"
                                            className="absolute h-full w-full object-cover"
                                        />
                                    )}
                                    <div className="flex items-center">
                                        <p className="fas fa-tags mr-2 text-blue-500 text-xl"></p>
                                        <p className="flex items-center justify-center gap-1">
                                            <span className="uppercase text-blue-500 font-medium font-oswald">
                                                {cart?.coupon?.code}
                                            </span>
                                            <span>is applied to your cart</span>
                                        </p>
                                    </div>
                                    <i
                                        onClick={handleRemoveCoupon}
                                        className="fal fa-times text-xl text-red-500 cursor-pointer hover:rotate-180"
                                        title="Remove coupon"
                                    />
                                </div>
                            ) : (
                                <div
                                    onClick={() => setShowCouponMenu(true)}
                                    className="mt-8 showCouponBtn flex group items-center w-full justify-between text-center gap-2 bg-white p-4 shadow-md rounded-lg cursor-pointer border border-gray-200"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="fas fa-badge-percent text-2xl text-green-600"></div>
                                        <div className="text-left">
                                            <h1 className="text-red-600 tracking-tight font-medium">
                                                Select offer / Apply coupon
                                            </h1>
                                            <span className="text-sm font-light">
                                                Get discount with your order
                                            </span>
                                        </div>
                                    </div>
                                    <div className="fal fa-chevron-right text-2xl text-gray-600 group-hover:translate-x-2 transition-all duration-200 ease-in-out"></div>
                                </div>
                            )}
                            <CouponSideBar
                                showCouponMenu={showCouponMenu}
                                handleClose={() => setShowCouponMenu(false)}
                            />
                        </div>
                    )}
                </section>
            </section>
        </>
    );
};

export default Cart;
