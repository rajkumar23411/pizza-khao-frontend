import React from "react";
import toaster from "react-hot-toast";
const getDate = (date) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];
    const d = new Date(date);
    const day = d.getDate();
    const month = months[d.getMonth()];

    return `${day} ${month}`;
};
const CouponBox = ({ coupon }) => {
    const copyCouponCode = async (e) => {
        try {
            await navigator.clipboard.writeText(e.target.innerText);
            toaster.success("Coupon code copied to your clipboard");
        } catch (error) {
            toaster.error("Could not copy coupon code");
        }
    };
    return (
        <div className="flex justify-center items-center m-6 p-4 bg-blue-50 rounded-lg gap-6 border-2 border-blue-200">
            <div className="flex flex-col text-center gap-1">
                <div className="fad fa-badge-percent text-5xl text-blue-500"></div>
                <span className="uppercase font-oswald text-blue-600">
                    {coupon.name}
                </span>
            </div>
            <div>
                <h1 className="text-gray-800 font-roboto font-medium">
                    Get upto {coupon.discount}% off on your first order
                </h1>
                <div className="flex items-center text-sm">
                    <p className="text-gray-700 font-roboto">
                        Use coupon code &nbsp;
                    </p>
                    <button
                        className="uppercase font-medium text-blue-600 hover:underline hover:cursor-pointer flex items-center gap-1 "
                        onClick={(e) => copyCouponCode(e)}
                    >
                        <span>{coupon.code}</span>
                        <span className="fal fa-copy" />
                    </button>
                </div>
                <div className="text-sm flex flex-col mt-2">
                    <ul className="pl-4">
                        <li className="list-disc font-light text-gray-600">
                            <span>
                                Save upto {coupon.discount}% on order above Rs.
                                {coupon.minOrderAmount}.
                            </span>
                        </li>
                        <li className="list-disc font-light text-gray-600">
                            <span>
                                Offer valid till {getDate(coupon.activeTo)}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CouponBox;
