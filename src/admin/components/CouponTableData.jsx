import React from "react";
import { useNavigate } from "react-router-dom";

const CouponTableData = ({
    coupon,
    handleChangeStatus,
    handleCouponDelete,
}) => {
    const navigate = useNavigate();
    const handleEditClick = (coupon) => {
        navigate(`/admin/dashboard/coupon/${coupon._id}`, {
            state: { coupon },
        });
    };
    return (
        <section className="flex bg-white py-4 drop-shadow-md rounded w-full">
            <div className="flex-1 flex items-center justify-center bg-white">
                <span className="capitalize">{coupon.name}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <span className="uppercase text-blue-600 font-medium">
                    {coupon.code}
                </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                {coupon.discount}%
            </div>
            <div className="flex-1 flex items-center justify-center">
                <span>{coupon.activeFrom.substring(0, 10)}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <span>{coupon.activeTo.substring(0, 10)}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <span
                    className={`capitalize text-green-700 ${
                        coupon.status === "inactive"
                            ? "text-red-600"
                            : "text-green-600"
                    }`}
                >
                    {coupon.status}
                </span>
            </div>
            <div className="flex-1 flex items-center justify-evenly gap-4">
                <button
                    onClick={() => handleEditClick(coupon)}
                    className="uppercase cursor-pointer text-blue-500 hover:text-blue-700"
                >
                    Edit
                </button>
                {coupon.status === "inactive" ? (
                    <button
                        onClick={() => handleChangeStatus(coupon._id, "active")}
                        className="uppercase cursor-pointer text-green-500 hover:text-green-700"
                    >
                        Active
                    </button>
                ) : (
                    <button
                        onClick={() =>
                            handleChangeStatus(coupon._id, "inactive")
                        }
                        className="uppercase cursor-pointer text-yellow-500 hover:text-yellow-700"
                    >
                        Inactive
                    </button>
                )}

                <button
                    onClick={() => handleCouponDelete(coupon._id)}
                    className="uppercase cursor-pointer text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </section>
    );
};

export default CouponTableData;
