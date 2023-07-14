import React, { useEffect } from "react";
import PageHeader from "./PageHeader";
import DashboardSectionHeader from "./DashboardSectionHeader";
import DataFormHeader from "./DataFormHeader";
import CouponTableData from "./CouponTableData";
import AddCouponForm from "./AddCouponForm";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getCoupons,
  changeStatus,
  deleteCoupon,
} from "../../redux/actions/couponAction";
import Loader from "./Loader";
import toaster from "react-hot-toast";
import { RESET_COUPON } from "../../redux/constants/couponConstant";
const CouponDetails = () => {
  const [showCouponForm, setShowCouponForm] = React.useState(false);
  const { loading, coupons, success, error, message } = useSelector(
    (state) => state.coupon
  );
  const dispatch = useDispatch();
  const handleCouponSearch = (keyword) => {
    dispatch(getCoupons(keyword));
  };
  const handleCouponStatus = (id, status) => {
    dispatch(changeStatus(id, status));
  };
  const handleCouponDelete = (id) => {
    dispatch(deleteCoupon(id));
  };
  useEffect(() => {
    if (success) {
      toaster.success(message);
      dispatch({ type: RESET_COUPON });
    }
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    dispatch(getCoupons());
  }, [dispatch, success, error, message]);
  return (
    <section className="flex-1 bg-gray-100">
      <PageHeader pagetitle="Coupon" />
      <section className="p-4 flex flex-col gap-6">
        <section className="w-full flex flex-col gap-6">
          <DashboardSectionHeader title="Coupon Lists" />
          <div className="w-full flex items-center justify-between">
            <div
              className="flex items-center h-10 gap-2"
              onClick={() => setShowCouponForm(true)}
            >
              <span className="bg-red-500 uppercase text-white h-full flex items-center justify-center px-4 tracking-wide rounded drop-shadow-md cursor-pointer hover:bg-red-600">
                Add coupon
              </span>
              <i className="fal fa-plus bg-white h-full flex items-center justify-center px-4 rounded text-lg text-gray-700 drop-shadow-md"></i>
            </div>
            <SearchBar onSearch={handleCouponSearch} />
          </div>
          <section
            className={`w-full ${
              showCouponForm ? "flex scale-100" : "h-0 scale-0"
            } flex-col gap-6 origin-center`}
          >
            <DashboardSectionHeader title="Add Coupon" />
            <AddCouponForm onCancel={() => setShowCouponForm(false)} />
          </section>
          <section className="flex flex-col gap-2">
            <DataFormHeader
              headerTitles={[
                "Coupon Name",
                "Coupon Code",
                "Discount Amount",
                "Active From",
                "Active To",
                "status",
                "Action",
              ]}
            />
            {loading ? (
              <Loader />
            ) : (
              coupons?.map((coupon) => (
                <CouponTableData
                  key={coupon._id}
                  coupon={coupon}
                  handleChangeStatus={handleCouponStatus}
                  handleCouponDelete={handleCouponDelete}
                />
              ))
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default CouponDetails;
