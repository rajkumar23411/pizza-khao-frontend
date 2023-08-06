import React from "react";

const ProductActionBtn = ({ type }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1
    ${
      type === "Edit"
        ? "text-blue-600 hover:text-blue-700"
        : "text-yellow-600 hover:text-yellow-700"
    }
     text-blue-600 cursor-pointer hover:text-blue-700`}
    >
      <i className={`${type === "Edit" ? "fal fa-edit" : "fad fa-eye"}`}></i>
      <span className="tracking-wide uppercase">{type}</span>
    </button>
  );
};

export default ProductActionBtn;
