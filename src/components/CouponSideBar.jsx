import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, validateCoupon } from "../redux/actions/couponAction";
import CouponBox from "./CouponBox";

const CouponSideBar = ({ showCouponMenu, handleClose, coupons }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.coupon);
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
        if (error) {
            setShowMessage(true);
            setMessage(error);
            setTimeout(() => {
                setShowMessage(false);
                setMessage("");
                dispatch(clearError());
            }, 5000);
        }
    }, [error, dispatch]);

    return (
        <div
            className={`h-screen couponMenu ${
                showCouponMenu
                    ? "w-[28rem] right-0 top-0 bottom-0 fixed drop-shadow-xl bg-white backdrop:blur-lg z-50"
                    : "w-0 -right-full"
            } `}
        >
            <div
                onClick={handleClose}
                className="fal fa-times text-2xl absolute -left-12 top-0 bg-white shadow-md p-4 rounded-l-2xl hover:text-red-600 hover:cursor-pointer"
            ></div>
            <h1 className="uppercase text-2xl font-medium text-white bg-red-600 p-6">
                Offers for you
            </h1>
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
            <div className="m-6 flex gap-4 flex-col mt-6">
                <h1 className="text-xl text-gray-900">Have a coupon code?</h1>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add your coupon code here..."
                        className="h-12 border border-gray-300 w-full pl-2 rounded-md bg-transparent placeholder:font-light placeholder:tracking-wide focus:border-blue-400"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="max-w-fit h-12 bg-red-700 hover:bg-red-800 text-white rounded-md px-6 uppercase cursor-pointer"
                    >
                        Apply
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CouponSideBar;
