import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearError,
    getCoupons,
    validateCoupon,
} from "../redux/actions/couponAction";
import CouponBox from "./CouponBox";
import toaster from "react-hot-toast";
import { RESET_COUPON } from "../redux/constants/couponConstant";
const CouponSideBar = ({ handleClose, showCouponMenu }) => {
    const dispatch = useDispatch();
    const {
        isValidate,
        coupons,
        message: couponMessage,
        error: couponError,
    } = useSelector((state) => state.coupon);
    const [coupon, setCoupon] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [showMessage, setShowMessage] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = coupon.toLowerCase();
        if (code === "") {
            setMessage("Please enter a coupon code");
        }
        dispatch(validateCoupon(code));
    };
    useEffect(() => {
        if (couponError) {
            setShowMessage(true);
            setMessage(couponError);
            dispatch(clearError());
            setTimeout(() => {
                setShowMessage(false);
                setMessage("");
                dispatch(clearError());
            }, 5000);
        }
        if (isValidate || couponMessage) {
            if (couponMessage) {
                toaster.success(couponMessage);
            }
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                handleClose();
                dispatch({ type: RESET_COUPON });
            }, 1500);
        }
        dispatch(getCoupons());
    }, [couponError, dispatch, isValidate, couponMessage]);

    return (
        <div
            className={`h-screen couponMenu w-[28rem] bg-white fixed top-0 bottom-0 transition-all duration-150 ease-in-out z-50 shadow-xl ${
                showCouponMenu
                    ? "right-0 visible opacity-100"
                    : "-right-full invisible opacity-0"
            }`}
        >
            <div className="bg-red-600 p-6 flex items-center justify-between">
                <h1 className="uppercase text-2xl font-medium text-white font-oswald">
                    Offers for you
                </h1>
                <div
                    onClick={handleClose}
                    className="fal fa-times text-2xl hover:cursor-pointer text-white hover:bg-red-700 h-8 w-8 grid place-items-center hover:rotate-180 rounded-full"
                ></div>
            </div>
            <div
                className={`m-6 bg-red-50 border border-red-300 p-4 rounded-lg ${
                    showMessage ? "flex " : "hidden"
                } items-center justify-center gap-4 transition-all ease-in-out duration-300`}
            >
                <span className="far fa-exclamation-circle text-red-500 text-xl"></span>
                <span className="font-roboto tracking-tight text-red-500">
                    {message}
                </span>
            </div>
            {coupons?.map((coupon) => (
                <CouponBox key={coupon._id} coupon={coupon} />
            ))}
            <div className="m-6 flex gap-4 flex-col mt-8">
                <h1 className="font-oswald text-lg uppercase text-gray-800 font-medium">
                    Have a coupon code?
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add your coupon code here*"
                        className="h-12 border-2 rounded-md placeholder:font-light border-gray-300 placeholder:text-black pl-2 placeholder:text-sm focus:border-blue-400 focus:placeholder:text-blue-500"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="h-12 rounded-md bg-red-500 hover:bg-red-600 text-white w-full m-auto"
                    >
                        Apply coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CouponSideBar;
