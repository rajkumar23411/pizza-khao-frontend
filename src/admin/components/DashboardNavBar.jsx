import React from "react";
import DashBoardLogo from "./DashBoardLogo";
import DashBoardNavTag from "./DashBoardNavTag";

const DashboardNavBar = () => {
  return (
    <section className="flex-[0.25] bg-red-700 min-h-screen py-10">
      <DashBoardLogo />
      <div className="mt-10">
        <DashBoardNavTag
          iconClass={`fal fa-home-lg-alt`}
          tagName="Dashboard"
          link={"/admin/dashboard"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-pizza-slice`}
          tagName="Products"
          link={"/admin/dashboard/products"}
        />
        <DashBoardNavTag iconClass={`fal fa-bags-shopping`} tagName="Orders" />
        <DashBoardNavTag
          iconClass={`fal fa-analytics`}
          tagName="Sales Statistics"
        />
        <DashBoardNavTag iconClass={`fal fa-users`} tagName="Users" />
        <DashBoardNavTag iconClass={`fal fa-comments`} tagName="Comments" />
        <DashBoardNavTag
          iconClass={`fal fa-question-circle`}
          tagName="Queries"
        />
      </div>
    </section>
  );
};

export default DashboardNavBar;
