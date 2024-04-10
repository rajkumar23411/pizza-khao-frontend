import React from "react";
import DashboardNavBar from "./components/DashboardNavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <section className="flex w-screen">
            <DashboardNavBar />
            <div className="flex-1">
                <Outlet />
            </div>
        </section>
    );
};

export default DashboardLayout;
