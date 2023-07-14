import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import UpdateCouponForm from "../components/UpdateCouponForm";

const CouponUpdate = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <UpdateCouponForm />
    </section>
  );
};

export default CouponUpdate;
