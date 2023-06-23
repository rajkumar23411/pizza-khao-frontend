import React from "react";

const AddToCartBtn = ({ handleClick, main }) => {
  return (
    <button
      onClick={handleClick}
      className={`${main ? 'sm:py-3 sm:px-6' : 'lg:py-0 md:py-0'} text-xs sm:text-base py-2 lg:h-full md:h-full bg-[#d2401e] flex items-center cursor-pointer justify-center px-3 uppercase font-normal rounded-sm tracking-widest text-white hover:bg-[#b9381b]`}
    >
      Add to cart
    </button>
  );
};

export default AddToCartBtn;
