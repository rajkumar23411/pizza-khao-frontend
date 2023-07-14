import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import UserTransactionBox from "./UserTransactionBox";
import RecentCustomer from "./RecentCustomer";
import UserQueryBox from "./UserQueryBox";

const ShowMoreButton = ({ label }) => {
  return (
    <button className="bg-slate-100 w-80 uppercase border-2 py-2 rounded-md tracking-wider border-red-600 text-red-700 hover:bg-red-600 cursor-pointer hover:text-white absolute bottom-0">
      {label}
    </button>
  );
};

const DashboardHomeRight = () => {
  return (
    <section className="flex-[0.5] flex flex-col gap-5 border-l p-6">
      <section className="flex flex-col gap-5">
        <DashboardSectionHeader title="Transactions" />
        <div className="w-full flex flex-col items-center gap-3 h-[28rem] overflow-y-hidden relative">
          <UserTransactionBox />
          <UserTransactionBox />
          <UserTransactionBox />
          <UserTransactionBox />
          <UserTransactionBox />
          <ShowMoreButton label={"View more"} />
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <DashboardSectionHeader title="Recent Customers" />
        <div className="w-full flex flex-col items-center gap-3 h-[28rem] overflow-y-hidden relative">
          <RecentCustomer />
          <RecentCustomer />
          <RecentCustomer />
          <RecentCustomer />
          <RecentCustomer />
          <ShowMoreButton label={"Show All"} />
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <DashboardSectionHeader title="User Queries" />
        <div className="flex items-center justify-center">
          <UserQueryBox />
        </div>
      </section>
    </section>
  );
};

export default DashboardHomeRight;
