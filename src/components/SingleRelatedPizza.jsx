import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DialogBoxData from "./DialogBoxData";

const SingleRelatedPizza = ({
  product,
  addToCart,
  loadingProductId,
  cartLoading,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col w-max lg:w-80 md:w-80 py-6 gap-2 pizza-box overflow-hidden relative h-[15rem] md:h-[24rem] lg:h-[23rem]">
      <Link to={`/pizza/${product._id}`}>
        <div className="pizza-image w-full flex items-center justify-center">
          <div className="h-28 w-28 lg:w-56 md:w-56 lg:h-56 md:h-56">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-golden uppercase font-medium tracking-wider text-sm lg:text-base md:text-base">
            {product.name}
          </p>
          <p className="text-base lg:text-lg md:text-lg font-bold text-[#D2401E] text-center">
            ₹{product.prices.regular} - ₹{product.prices.large}
          </p>
        </div>
      </Link>
      <div className="w-full flex items-center justify-center gap-2 button-box">
        {loadingProductId === product._id && cartLoading ? (
          <span className="flex items-center justify-center gap-2 bg-red-400 px-6 py-1 lg:py-3 md:py-3 font-normal tracking-wider text-white uppercase rounded">
            <i className="fa fa-spinner fa-spin"></i>Adding...
          </span>
        ) : (
          <span
            onClick={() => addToCart(product._id, 1, "regular")}
            className="py-2 lg:py-0 md:py-0 lg:h-full md:h-full bg-[#d2401e] flex items-center cursor-pointer justify-center px-3 uppercase  font-normal rounded-sm text-xs lg:text-sm md:text-sm tracking-widest text-white hover:bg-[#b9381b]"
          >
            Add to cart
          </span>
        )}
        <span
          className="hidden py-2 lg:py-0 md:py-0 lg:h-full md:h-full bg-slate-100 sm:flex md:flex lg:flex items-center cursor-pointer justify-center px-3 uppercase font-normal rounded-sm text-gray-800 text-xs lg:text-sm md:text-sm tracking-widest hover:bg-slate-200"
          onClick={handleClickOpen}
        >
          Quick view
        </span>
      </div>
      {
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogBoxData pizza={product} onClose={handleClose} />
        </Dialog>
      }
    </div>
  );
};

export default SingleRelatedPizza;
