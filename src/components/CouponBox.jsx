import React from "react";
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
    return (
        <div className="flex justify-center items-center m-6 p-6 bg-red-50 rounded-lg gap-10 border border-red-200">
            <div className="flex flex-col text-center gap-2">
                <div className="fad fa-badge-percent text-5xl text-red-500"></div>
                <span className="uppercase">{coupon.name}</span>
            </div>
            <div>
                <h1 className="text-lg text-gray-900 font-roboto font-medium">
                    Get {coupon.discount}% off on your first order
                </h1>
                <p className="text-gray-700 font-roboto">
                    Use coupon code &nbsp;
                    <span className="text-red-600 uppercase">
                        {coupon.code}
                    </span>
                </p>
                <div className="text-sm font-light flex flex-col mt-2">
                    <ul className="list-disc pl-4">
                        <li>
                            <span className="font-roboto">
                                Save upto {coupon.discount}% on order above Rs.
                                {coupon.minOrderAmount}.
                            </span>
                        </li>
                        <li>
                            <span className="font-roboto">
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
