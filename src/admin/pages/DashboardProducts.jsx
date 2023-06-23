import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import DashBoardProductDetails from "../components/DashBoardProductDetails";

const DashboardProducts = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <DashBoardProductDetails />
    </section>
  );
};

export default DashboardProducts;
