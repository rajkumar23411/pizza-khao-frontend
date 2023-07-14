import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import DataFormHeader from "./DataFormHeader";
import PageHeader from "./PageHeader";
import ProductFormData from "./ProductFormData";
import SearchBar from "./SearchBar";

const DashBoardProductDetails = () => {
  return (
    <section className="flex-1 bg-slate-100 flex flex-col">
      <PageHeader pagetitle={"Products"} />
      <section className="p-4 flex flex-col gap-5">
        <DashboardSectionHeader title={"Product List"} />
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-1 h-10 font-roboto flex-1">
            <span className="h-full uppercase bg-red-600 text-white rounded-lg flex items-center justify-center px-4 font-normal drop-shadow-lg">
              Add New Product
            </span>
            <span className="h-full bg-white flex items-center justify-center px-3 rounded-lg shadow-md shadow-slate-200">
              <i className="fal fa-plus text-xl text-gray-700"></i>
            </span>
          </div>
          <div className="text-gray-600 text-sm flex-1 text-center">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="flex-1 flex items-center justify-end">
            <SearchBar />
          </div>
        </section>
        <section>
          <DataFormHeader
            headerTitles={[
              "Image",
              "Product name",
              "Status",
              "Total Orders",
              "Action",
            ]}
          />
          <ProductFormData />
          <ProductFormData />
          <ProductFormData />
          <ProductFormData />
        </section>
      </section>
    </section>
  );
};

export default DashBoardProductDetails;
