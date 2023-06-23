import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";

import "../Dashboard.css";
import DashBoardHome from "../components/DashBoardHome";
const Dashboard = () => {
  return (
    <section className="flex">
      <DashboardNavBar />
      <DashBoardHome />
    </section>
  );
};

export default Dashboard;
