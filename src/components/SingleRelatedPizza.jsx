import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DialogBoxData from "./DialogBoxData";

const SingleRelatedPizza = ({ product, addToCart }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col w-80 py-6 gap-6 pizza-box overflow-hidden relative h-[22rem]">
      <Link to={`/pizza/${product._id}`}>
        <div className="pizza-image w-full flex items-center justify-center">
          <img
            src={product.image}
            alt="pizza"
            className="h-52"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className=" text-yellow-700 uppercase font-medium tracking-wider text-base">
            {product.name}
          </p>
          <p className="text-xl font-medium text-[#D2401E]">
            ₹{product.prices.regular} - ₹{product.prices.extralarge}{" "}
          </p>
        </div>
      </Link>
      <div className="w-full flex items-center justify-center gap-2 button-box">
        <span
          className="py-3 bg-[#d2401e] flex items-center cursor-pointer justify-center px-3 uppercase  font-normal rounded-sm  text-xs tracking-widest text-white hover:bg-[#b9381b]"
          onClick={() => addToCart(product._id, 1, "regular")}
        >
          Add to cart
        </span>
        <span
          className="py-3 bg-slate-100 flex items-center cursor-pointer justify-center px-3 uppercase  font-normal rounded-sm text-gray-800 text-xs tracking-widest hover:bg-slate-200"
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
