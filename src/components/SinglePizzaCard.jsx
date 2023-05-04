import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import DialogBoxData from "./DialogBoxData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearError } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../utils/Arrows";
const SinglePizzaCard = ({ products }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.myCart);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddtoCart = (id, count, size) => {
    setLoadingProductId(id);
    dispatch(addToCart(id, count, size));
  };
  useEffect(() => {
    if (success) {
      enqueueSnackbar("Item added to cart", { variant: "success" });
      dispatch({ type: ADD_TO_CART_RESET });
      setLoadingProductId(null);
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
      setLoadingProductId(null);
    }
  }, [success, error, enqueueSnackbar, dispatch]);
  return (
    <Slider {...settings}>
      {products?.map((pizza) => (
        <div key={pizza._id}>
          <div className="flex flex-col w-max lg:w-80 md:w-80 py-6 gap-2 pizza-box overflow-hidden relative h-[16rem] md:h-[24rem] lg:h-[24rem]">
            <Link to={`/pizza/${pizza._id}`} className="cursor-pointer">
              <div className="pizza-image w-full flex items-center justify-center flex-col gap-2">
                <div className="h-32 w-32 lg:w-56 md:w-56 lg:h-56 md:h-56">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                <p className=" text-yellow-700 uppercase font-medium tracking-wider text-sm lg:text-base md:text-base">
                  {pizza.name}
                </p>
              </div>
              <p className="text-base lg:text-lg md:text-lg font-bold text-[#D2401E] text-center">
                ₹{pizza.prices.regular} - ₹{pizza.prices.large}
              </p>
            </Link>
            <div className="w-full flex items-center justify-center gap-2 button-box">
              {loadingProductId === pizza._id && loading ? (
                <span className="flex items-center justify-center gap-2 bg-red-400 px-6 py-1 lg:py-3 md:py-3 font-normal tracking-wider text-white uppercase rounded">
                  <i className="fa fa-spinner fa-spin"></i>Adding...
                </span>
              ) : (
                <span
                  onClick={() => handleAddtoCart(pizza._id, 1, "regular")}
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
          </div>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="lg"
          >
            <DialogBoxData pizza={pizza} onClose={handleClose} />
          </Dialog>
        </div>
      ))}
    </Slider>
  );
};

export default SinglePizzaCard;
