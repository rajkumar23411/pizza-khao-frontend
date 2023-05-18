import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import DialogBoxData from "./DialogBoxData";
import { Dialog, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
const MenuLightPizza = ({ product, loading }) => {
  const [open, setOpen] = React.useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const handleAddtoCart = (id, count, size) => {
    setLoadingProductId(id);
    dispatch(addToCart(id, count, size));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-48lg:w-80 md:w-60 sm:py-6 gap-2 pizza-box overflow-hidden relative lg:h-[23rem] md:h-[18rem]"
    >
      <Link to={`/pizza/${product._id}`}>
        <div className="pizza-image w-full flex flex-col gap-2 items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-24 w-24 lg:h-56 md:h-40 lg:w-56 md:w-40 object-cover"
            draggable="false"
          />
          <p className=" text-yellow-700 uppercase font-medium tracking-wider text-sm">
            {product.name}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-base font-bold text-[#D2401E]">
            ₹{product.prices.regular} - ₹{product.prices.extralarge}
          </p>
        </div>
      </Link>
      <div
        className={`flex sm:flex-row items-center justify-center gap-2 text-sm md:text-xs mt-2 sm:mt-0 ${
          isSmallScreen === false && "button-box"
        }`}
      >
        {loadingProductId === product._id && loading ? (
          <span className="flex items-center justify-center gap-2 bg-red-400 px-6 py-1 lg:py-3 md:py-3 font-normal tracking-wider text-white uppercase rounded">
            <i className="fas fa-spinner fa-spin text-xl"></i>Adding...
          </span>
        ) : (
          <span
            onClick={() => handleAddtoCart(product._id, 1, "regular")}
            className="py-1 lg:py-0 md:py-0 lg:h-full md:h-full bg-[#d2401e] flex items-center cursor-pointer justify-center px-1 sm:px-3 uppercase  font-normal rounded-sm text-xs lg:text-sm md:text-sm tracking-wider sm:tracking-widest text-white hover:bg-[#b9381b]"
          >
            Add to cart
          </span>
        )}
        <span
          className="py-1 lg:py-0 md:py-0 lg:h-full md:h-full bg-slate-100 sm:flex md:flex lg:flex items-center cursor-pointer justify-center px-1 sm:px-3 uppercase font-normal rounded-sm text-gray-800 text-xs lg:text-sm md:text-sm tracking-wider sm:tracking-widest hover:bg-slate-200"
          onClick={() => handleClickOpen(product)}
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
    </motion.div>
  );
};

export default MenuLightPizza;
