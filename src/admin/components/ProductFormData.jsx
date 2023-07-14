import React from "react";
import ProductActionBtn from "./ProductActionBtn";

const ProductFormData = () => {
  return (
    <div className="flex bg-white items-center justify-center my-2 rounded-md shadow-md shadow-slate-200 py-2">
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/sign-up-bg.jpg?updatedAt=1683123635585"
          alt="test"
          className="w-12 h-12 rounded-full overflow-hidden object-cover drop-shadow-lg"
        />
      </div>
      <div className="flex-1 text-center text-gray-700">Test Data Name</div>
      <div className="flex-1 text-center text-green-700">Active</div>
      <div className="flex-1 text-center text-gray-500">200</div>
      <div className="flex-1 flex items-center justify-center gap-4 border-l">
        <ProductActionBtn type={"Edit"} />
        <ProductActionBtn type={"Deactive"} />
        <ProductActionBtn type={"Delete"} />
      </div>
    </div>
  );
};

export default ProductFormData;
