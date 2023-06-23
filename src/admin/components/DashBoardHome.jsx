import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import ReportBox from "./ReportBox";
import PageTracker from "./PageTracker";

const DashBoardHome = () => {
  return (
    <section className="flex-1 flex flex-col gap-6 bg-slate-100 min-h-screen p-6">
      <PageTracker pagename={"Home"} />
      <section>
        <DashboardSectionHeader title="General Report" />
      </section>
      <section className="grid grid-cols-4 gap-y-4">
        <ReportBox
          title={"Item sales"}
          icon="fal fa-chart-line text-yellow-500"
        />
        <ReportBox
          title={"Total orders"}
          icon="fal fa-shopping-cart text-green-500"
        />
        <ReportBox title={"Products"} icon="far fa-cubes text-red-500" />
        <ReportBox title={"Total Users"} icon="fal fa-users text-green-500" />
      </section>
      <section></section>
    </section>
  );
};

export default DashBoardHome;
