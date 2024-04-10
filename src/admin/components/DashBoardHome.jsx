import React from "react";
import PageHeader from "./PageHeader";
import DashboardHomeLeft from "./DashboardHomeLeft";
import DashboardHomeRight from "./DashboardHomeRight";

const DashBoardHome = () => {
    return (
        <section className="flex-1 flex flex-col bg-gray-100 min-h-screen overflow-y-auto overflow-x-hidden">
            <PageHeader pagetitle={"Home"} />
            <section className="flex gap-6 border-t">
                <DashboardHomeLeft />
                <DashboardHomeRight />
            </section>
        </section>
    );
};

export default DashBoardHome;
