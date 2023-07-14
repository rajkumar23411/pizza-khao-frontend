import React from "react";

const ProductActionBtn = ({ type }) => {
  return (
    <button
      className={`flex items-center justify-center gap-1
    ${
      type === "Edit"
        ? "text-blue-600 hover:text-blue-700"
        : type === "Deactive"
        ? "text-yellow-600 hover:text-yellow-700"
        : "text-red-600 hover:text-red-700"
    }
     text-blue-600 cursor-pointer hover:text-blue-700`}
    >
      <i
        className={`${
          type === "Edit"
            ? "fal fa-edit"
            : type === "Deactive"
            ? "fal fa-unlock-alt"
            : "fal fa-trash-alt"
        }`}
      ></i>
      <span className="font-roboto tracking-tighter">{type}</span>
    </button>
  );
};

export default ProductActionBtn;
