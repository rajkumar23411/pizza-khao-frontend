import React from "react";
import DashboardNavBar from "./components/DashboardNavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <section className="flex">
            <DashboardNavBar />
            <Outlet />
        </section>
    );
};

export default DashboardLayout;
