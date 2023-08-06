import React from "react";
import DataFormHeaderTitle from "./DataFormHeaderTitle";
const DataFormHeader = ({ headerTitles, width }) => {
  return (
    <div className="w-full flex items-center py-2 font-medium text-gray-700">
      {headerTitles.map((tag, index) => (
        <DataFormHeaderTitle key={index} title={tag} width={width} />
      ))}
    </div>
  );
};

export default DataFormHeader;
