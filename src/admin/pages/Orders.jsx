import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import DashBoardOrderDetails from "../components/DashBoardOrderDetails";

const Orders = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <DashBoardOrderDetails />
    </section>
  );
};

export default Orders;
