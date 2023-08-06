import React from "react";

const DataFormHeaderTitle = ({ title, width }) => {
  return (
    <div
      className={`${
        width ? width : "flex-1"
      } text-center uppercase text-sm text-gray-700`}
    >
      {title}
    </div>
  );
};

export default DataFormHeaderTitle;
