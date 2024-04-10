import { Rating, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { pizzaSize } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DialogBoxData = ({ pizza, onClose }) => {
    const [size, setSize] = React.useState("regular");
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleAddtoCart = (id, count, size) => {
        dispatch(addToCart(id, count, size));
    };
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 flex items-center justify-center m-4 sm:m-10">
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    draggable="false"
                    className="h-48 w-48 sm:h-96 sm:w-96 object-cover rounded-md drop-shadow-md"
                />
            </div>
            <div className="flex-1 flex flex-col m-4 sm:m-10">
                <h1 className="uppercase text-base sm:text-2xl font-semibold tracking-wider text-gray-700">
                    {pizza.name}
                </h1>
                <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-4">
                    <Rating
                        precision={0.5}
                        value={pizza.ratings}
                        readOnly={true}
                        size={isSmallScreen ? "small" : "medium"}
                    />
                    <div>
                        {pizza.ratings === 0 ? (
                            <div className="text-xs sm:text-base text-gray-700">
                                ( No reviews yet )
                            </div>
                        ) : (
                            <div className="text-xs sm:text-base">
                                ({pizza.numOfReviews} customer review)
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-base sm:text-xl text-red-600 font-bold">
                    ₹{pizza.prices?.regular} - ₹{pizza.prices?.extralarge}
                </p>
                <p className="text-xs font-light sm:font-normal sm:text-base text-gray-500 pt-3 sm:pt-6">
                    {pizza.description}
                </p>
                <div className="hidden sm:flex flex-col pt-10">
                    <h1 className="uppercase font-bold text-golden">
                        NUTRITIONAL VALUE PER 100G:
                    </h1>
                    <div className="flex pt-2">
                        <span className="flex-[0.8] text-base text-gray-500">
                            Calories
                        </span>
                        <span className="flex-1 text-red-700 font-semibold font-sans">
                            800 kcal
                        </span>
                    </div>
                    <div className="flex">
                        <span className="flex-[0.8] text-base text-gray-500">
                            Carbohydrates
                        </span>
                        <span className="flex-1 text-red-700 font-semibold font-sans">
                            20 g
                        </span>
                    </div>
                    <div className="flex ">
                        <span className="flex-[0.8] text-base text-gray-500">
                            Fats
                        </span>
                        <span className="flex-1 text-red-700 font-semibold font-sans">
                            50.9 g
                        </span>
                    </div>
                    <div className="flex">
                        <span className="flex-[0.8] text-base text-gray-500">
                            Protien
                        </span>
                        <span className="flex-1 text-red-700 font-semibold font-sans">
                            120 g
                        </span>
                    </div>
                </div>
                <div className="flex items-center mt-3 sm:mt-6 gap-1">
                    <span className="text-golden font-medium uppercase text-sm sm:text-base">
                        Categories:
                    </span>
                    {pizza?.category?.map((cat, index) => (
                        <span
                            className="text-gray-500 font-normal tracking-wide text-sm sm:text-base"
                            key={index}
                        >
                            {cat}
                            {index !== pizza.category.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 sm:gap-3 items-center py-3 sm:py-6">
                    <div className="text-sm sm:text-base font-medium uppercase text-golden">
                        Pick Size:
                    </div>
                    <div className="bg-gray-100 w-40 flex items-center justify-between h-10 sm:h-12 rounded-sm">
                        <select
                            className="bg-transparent text-sm sm:text-base appearance-none w-full text-gray-600 h-full cursor-pointer px-2 capitalize"
                            onChange={handleSizeChange}
                        >
                            <option value="">Select Size</option>
                            {pizzaSize.map((size, index) => (
                                <option
                                    key={index}
                                    value={size}
                                    className="capitalize"
                                >
                                    {size}
                                </option>
                            ))}
                        </select>
                        <ExpandMoreIcon
                            fontSize="small"
                            sx={{ color: "gray" }}
                        />
                    </div>
                </div>
                {size === "" ? (
                    <div className="text-xl sm:text-2xl text-red-600 font-bold pb-8">
                        ₹{pizza.prices?.regular}
                    </div>
                ) : (
                    <div className="text-xl sm:text-2xl text-red-600 font-bold pb-8">
                        ₹{pizza.prices && pizza.prices[size]}
                    </div>
                )}
                <div className="flex gap-2">
                    <div
                        onClick={() => handleAddtoCart(pizza._id, 1, size)}
                        className="flex-1 bg-red-600 text-center rounded uppercase text-white tracking-wider py-2 sm:py-3 cursor-pointer text-sm sm:text-base"
                    >
                        Add to cart
                    </div>
                    {/* {isInWishlist ? (
                        <Link
                            to="/account/favourites"
                            className="flex-1 text-center border-2 border-gray-300 text-gray-600 py-2 sm:py-3 uppercase text-sm tracking-wide cursor-pointer rounded"
                        >
                            Go to favourites
                        </Link>
                    ) : (
                        <div
                            onClick={() => handleAddtoFavourite(pizza._id)}
                            className="flex-1 bg-slate-100 text-center rounded uppercase text-gray-700 tracking-wider py-2 sm:py-3 cursor-pointer text-sm sm:text-base"
                        >
                            Save to Favourite
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default DialogBoxData;
