import React, { useState } from "react";
import { Dialog } from "@mui/material";
import DialogBoxData from "./DialogBoxData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import AddToCartBtn from "./Buttons/AddToCartBtn";

const SinglePizzaCard = ({ pizza }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.myCart);
    const [loadingProductId, setLoadingProductId] = useState(null);

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

    return (
        <div key={pizza._id}>
            <div className="flex flex-col w-max lg:w-80 md:w-80 py-6 gap-2 pizza-box overflow-hidden relative h-[15rem] md:h-[24rem] lg:h-[21rem]">
                <Link to={`/pizza/${pizza._id}`} className="cursor-pointer">
                    <div className="pizza-image w-full flex items-center justify-center flex-col gap-2">
                        <div className="h-28 w-28 lg:w-48 md:w-56 lg:h-48 md:h-56">
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                className="w-full h-full object-cover"
                                draggable="false"
                            />
                        </div>
                        <p className="text-golden uppercase font-medium tracking-wider text-sm lg:text-base md:text-base font-oswald">
                            {pizza.name}
                        </p>
                    </div>
                    <p className="text-base lg:text-lg md:text-lg font-bold text-[#D2401E] text-center font-oswald">
                        ₹{pizza.prices.regular} - ₹{pizza.prices.large}
                    </p>
                </Link>
                <div className="w-full flex items-center justify-center gap-2 button-box">
                    {loadingProductId === pizza._id && loading ? (
                        <button
                            disabled={true}
                            className="flex items-center justify-center gap-2 bg-red-400 px-6 py-1 lg:py-3 font-oswald md:py-3 font-normal tracking-wider text-white uppercase rounded"
                        >
                            <i className="fas fa-spinner fa-spin"></i>Adding...
                        </button>
                    ) : (
                        <AddToCartBtn
                            handleClick={() =>
                                handleAddtoCart(pizza._id, 1, "regular")
                            }
                        />
                    )}
                    <button
                        className="hidden py-2 lg:py-0 md:py-0 font-oswald lg:h-full md:h-full bg-slate-100 sm:flex md:flex lg:flex items-center cursor-pointer justify-center px-3 uppercase font-normal rounded-sm text-gray-800 text-xs lg:text-sm md:text-sm tracking-widest hover:bg-slate-200"
                        onClick={handleClickOpen}
                    >
                        Quick view
                    </button>
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
    );
};

export default SinglePizzaCard;
