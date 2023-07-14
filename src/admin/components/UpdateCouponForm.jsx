import React, { useEffect } from "react";
import PageHeader from "./PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCoupon } from "../../redux/actions/couponAction";
import toaster from "react-hot-toast";
import { RESET_COUPON } from "../../redux/constants/couponConstant";

const UpdateCouponForm = () => {
  const coupon = useLocation().state.coupon;
  const navigate = useNavigate();
  const { success, error, message } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: coupon?.name,
    code: coupon?.code,
    discount: coupon?.discount,
    activeFrom: coupon?.activeFrom?.substring(0, 10),
    activeTo: coupon?.activeTo?.substring(0, 10),
    status: coupon?.status,
    minOrderAmount: coupon?.minOrderAmount,
    description: coupon?.description,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCoupon(coupon._id, formData));
  };
  useEffect(() => {
    if (success) {
      toaster.success(message);
      navigate("/admin/dashboard/coupons");
      dispatch({ type: RESET_COUPON });
    }
    if (error) {
      toaster.error(error);
    }
  });
  return (
    <section className="flex-1 flex items-center p-4 bg-gray-100 flex-col">
      <PageHeader pagetitle={["coupon", `${coupon.name}`]} />
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded-md drop-shadow-md w-[40rem]"
      >
        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Coupon name
            </label>
            <input
              type="text"
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Coupon code
            </label>
            <input
              type="text"
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Discount percentage
            </label>
            <select
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            >
              {[10, 20, 30, 40, 50, 60, 70].map((price, indx) => (
                <option value={price} key={indx}>
                  {price}%
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Minimum order amount
            </label>
            <input
              type="number"
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Valid from
            </label>
            <input
              type="date"
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="activeFrom"
              value={formData.activeFrom}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Valid until
            </label>
            <input
              type="date"
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
              name="activeTo"
              value={formData.activeTo}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="couponName"
              className="text-gray-500 font-roboto tracking-tight font-medium"
            >
              Conpoun status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-12 bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label
            htmlFor="description"
            className="text-gray-500 font-roboto tracking-tight font-medium"
          >
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            className="bg-transparent border-2 border-gray-300 focus:border-sky-500 rounded px-2 resize-none"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="h-12 w-full">
          <input
            type="submit"
            value="Update coupon"
            className="h-full w-full bg-sky-500 rounded uppercase text-white tracking-wider cursor-pointer hover:bg-sky-600"
          />
        </div>
      </form>
    </section>
  );
};

export default UpdateCouponForm;
