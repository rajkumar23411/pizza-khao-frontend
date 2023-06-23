import React from "react";
import PageTracker from "./PageTracker";
import DashboardSectionHeader from "./DashboardSectionHeader";
import DataFormHeader from "./DataFormHeader";
import FormData from "./FormData";

const DashBoardProductDetails = () => {
  return (
    <section className="flex-1 bg-slate-100 p-6 flex flex-col gap-10">
      <PageTracker pagename={"Products"} />
      <DashboardSectionHeader title={"Data list"} />
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-1 h-10 font-roboto">
          <span className="h-full bg-red-600 text-white rounded-lg flex items-center justify-center px-4 font-normal">
            Add New Product
          </span>
          <span className="h-full bg-white flex items-center justify-center px-3 rounded-lg shadow-md shadow-slate-200">
            <i className="fal fa-plus text-xl text-gray-700"></i>
          </span>
        </div>
        <div className="text-gray-600 text-sm">
          Showing 1 to 10 of 150 entries
        </div>
        <div>
          <form className="flex items-center justify-center bg-white h-10 px-4 rounded-lg">
            <input type="text" className="h-full bg-transparent pr-2" />
            <button
              type="submit"
              className="fal fa-search text-gray-600 text-xl"
            ></button>
          </form>
        </div>
      </section>
      <section>
        <DataFormHeader />
        <FormData />
        <FormData />
        <FormData />
        <FormData />
      </section>
    </section>
  );
};

export default DashBoardProductDetails;
