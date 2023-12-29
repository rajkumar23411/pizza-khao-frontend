import React from "react";
import { Dialog, useMediaQuery } from "@mui/material";
import DialogBoxData from "./DialogBoxData";
import { Link } from "react-router-dom";

const PizzaCard = ({
    product,
    primaryBtn,
    handleClick,
    loadingProductId,
    cartLoading,
}) => {
    const [open, setOpen] = React.useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div
                key={product._id}
                className="flex items-center justify-center flex-col bg-white px-4 py-2 rounded-xl drop-shadow-sm relative h-max w-64"
            >
                <Link
                    to={`/pizza/${product._id}`}
                    className="cursor-pointer flex flex-col items-center justify-center"
                >
                    {product.discount > 0 && (
                        <div className="absolute left-3 top-3 h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs sm:text-base">
                            -{product.discount}%
                        </div>
                    )}
                    <div className="h-24 w-24 sm:h-40 sm:w-40">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="uppercase font-medium text-golden text-sm sm:text-base">
                        {isSmallScreen && product.name.length > 14
                            ? `${product.name.slice(0, 12)}...`
                            : product.name}
                    </div>
                    <div className="text-xs sm:text-base">
                        ₹{product.prices.regular} - ₹{product.prices.extralarge}
                    </div>
                </Link>
                <div className="w-full flex items-center justify-between pt-2 sm:px-2 gap-2">
                    <button
                        onClick={() => handleClick(product._id, 1, "regular")}
                        className="border w-full border-blue-600 text-blue-600 px-3 py-1 uppercase rounded hover:bg-blue-600 hover:text-white text-xs sm:text-sm"
                        disabled={cartLoading}
                    >
                        {loadingProductId === product._id && cartLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin text-xl"></i>
                                Adding...
                            </>
                        ) : (
                            primaryBtn
                        )}
                    </button>
                    <button
                        onClick={() => handleClickOpen(product)}
                        className="border w-full border-red-600 text-red-600 px-3 py-1 uppercase rounded hover:bg-red-600 hover:text-white text-xs sm:text-sm"
                    >
                        {isSmallScreen ? "View" : "Quick View"}
                    </button>
                </div>
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
            </div>
        </>
    );
};

export default PizzaCard;
