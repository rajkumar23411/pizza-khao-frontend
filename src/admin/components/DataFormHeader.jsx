import React from "react";
import DataFormHeaderTitle from "./DataFormHeaderTitle";
const DataFormHeaderTags = [
  "Image",
  "Product name",
  "Status",
  "Total Orders",
  "Action",
];
const DataFormHeader = () => {
  return (
    <div className="w-full flex items-center">
      {DataFormHeaderTags.map((tag, index) => (
        <DataFormHeaderTitle key={index} title={tag} />
      ))}
    </div>
  );
};

export default DataFormHeader;
