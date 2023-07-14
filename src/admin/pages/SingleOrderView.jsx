import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import SingleOrder from "./../components/SingleOrder";

const SingleOrderView = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <SingleOrder />
    </section>
  );
};

export default SingleOrderView;
