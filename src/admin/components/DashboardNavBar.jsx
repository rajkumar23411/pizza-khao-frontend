import React from "react";
import DashBoardLogo from "./DashBoardLogo";
import DashBoardNavTag from "./DashBoardNavTag";

const DashboardNavBar = () => {
  return (
    <section className="flex-[0.22] bg-red-700 min-h-screen py-10">
      <DashBoardLogo />
      <div className="mt-10">
        <DashBoardNavTag
          iconClass={`fal fa-home-lg-alt`}
          tagName="Dashboard"
          link={""}
        />
        <DashBoardNavTag
          iconClass={`fal fa-pizza-slice`}
          tagName="Products"
          link={"products"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-bags-shopping`}
          tagName="Orders"
          link={"orders"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-analytics`}
          tagName="Sales Statistics"
          link={"sales"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-users`}
          tagName="Users"
          link={"users"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-comments`}
          tagName="Comments"
          link={"comments"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-tags`}
          tagName="Coupons"
          link={"coupons"}
        />
        <DashBoardNavTag
          iconClass={`fal fa-question-circle`}
          tagName="Queries"
          link={"queries"}
        />
      </div>
    </section>
  );
};

export default DashboardNavBar;
