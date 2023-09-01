import React from "react";
import ProductActionBtn from "./ProductActionBtn";
import { useNavigate } from "react-router-dom";

const ProductFormData = ({ product }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/admin/dashboard/product/edit?id=${product._id}`);
  };
  return (
    <div className="flex bg-white items-center justify-center my-2 rounded-md shadow-md shadow-slate-200 py-2">
      <div className="flex-[0.5] flex items-center justify-center">
        <img
          src={`${product.image}`}
          alt="test"
          className="w-12 h-12 rounded-full overflow-hidden object-cover drop-shadow-lg"
        />
      </div>
      <div className="flex-1 text-center text-gray-700 capitalize">
        {product.name}
      </div>
      <div className="flex-1 text-center text-gray-500">
        {`₹${product?.prices["regular"]} - ₹${product?.prices["extralarge"]}`}
      </div>
      <div className="flex-1 text-center">
        {product?.category.map((cat, i) => (
          <span key={i} className="text-gray-500">
            {cat}
          </span>
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center gap-4 border-l">
        <ProductActionBtn type={"Edit"} action={navigateTo} />
        <ProductActionBtn type={"View"} />
      </div>
    </div>
  );
};

export default ProductFormData;
