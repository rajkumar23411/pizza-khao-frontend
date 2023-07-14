import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import CouponDetails from "../components/CouponDetails";

const Coupon = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <CouponDetails />
    </section>
  );
};

export default Coupon;
