import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import DialogBoxData from "./DialogBoxData";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
const MenuLightPizza = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleAddtoCart = (id, count, size) => {
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
      className="flex flex-col lg:w-80 md:w-60 py-6 gap-2 pizza-box overflow-hidden relative lg:h-[22rem]  md:h-[18rem]"
    >
      <Link to={`/pizza/${product._id}`}>
        <div className="pizza-image w-full flex flex-col gap-2 items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="lg:h-56 md:h-40 lg:w-56 md:w-40 object-cover"
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
      <div className="w-full flex items-center justify-center gap-2 button-box">
        <span
          onClick={() => handleAddtoCart(product._id, 1, "regular")}
          className="py-2 px-3 bg-[#d2401e] flex items-center cursor-pointer justify-center uppercase font-normal  text-sm tracking-widest text-white hover:bg-[#b9381b] rounded-sm"
        >
          Add to cart
        </span>
        <span
          onClick={handleClickOpen}
          className="py-2 px-3 bg-slate-100 flex items-center cursor-pointer justify-center uppercase font-normal text-gray-800 text-sm tracking-widest hover:bg-slate-200 rounded-sm"
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
