import React from "react";
import { Dialog } from "@mui/material";
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
    const handleClickOpen = (item) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div
                key={product._id}
                className="flex items-center justify-center flex-col bg-white px-4 py-2 rounded-xl drop-shadow-sm relative h-max w-max"
            >
                <Link
                    to={`/pizza/${product._id}`}
                    className="cursor-pointer text-center"
                >
                    {product.discount > 0 && (
                        <div className="absolute left-3 top-3 h-12 w-12 rounded-full bg-yellow-500 text-white flex items-center justify-center">
                            -{product.discount}%
                        </div>
                    )}
                    <div className="h-40 w-40">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="uppercase font-medium text-golden">
                        {product.name}
                    </div>
                    <div>
                        ₹{product.prices.regular} - ₹{product.prices.extralarge}
                    </div>
                </Link>
                <div className="w-full flex items-center justify-between pt-2 px-2 gap-2">
                    <button
                        onClick={() => handleClick(product._id, 1, "regular")}
                        className="border border-blue-600 text-blue-600 px-3 py-1 uppercase rounded hover:bg-blue-600 hover:text-white text-sm"
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
                        className="border border-red-600 text-red-600 px-3 py-1 uppercase rounded hover:bg-red-600 hover:text-white text-sm"
                    >
                        Quick View
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
