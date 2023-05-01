import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import HomeFooter from "../components/HomeFooter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PizzaInformation from "../components/PizzaInformation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ItemSkeleton from "../components/ItemSkeleton";
import {
  getProductDetails,
  getRelatedProducts,
} from "../redux/actions/productAction";
import { pizzaSize } from "../utils";
import { Rating } from "@mui/material";
import SinglePizzaLoader from "../components/SinglePizzaLoader";
import {
  addToCart,
  clearError,
  getCartItems,
} from "../redux/actions/cartActions";
import { useSnackbar } from "notistack";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import SingleRelatedPizza from "./../components/SingleRelatedPizza";
import Slider from "react-slick";
import { settings } from "../utils/Arrows";
import PageHead from "../components/PageHead";

const SinglePizza = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  const { success, error, cart } = useSelector((state) => state.myCart);
  const { loading: relatedProductLoading, relatedProducts } = useSelector(
    (state) => state.relatedProducts
  );
  const [price, setPrice] = useState();
  const [size, setSize] = useState(product ? "regular" : "");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSelectSize = (e) => {
    setSize(e.target.value);
    if (e.target.value === "regular") {
      setPrice(product.prices.regular);
    } else if (e.target.value === "medium") {
      setPrice(product.prices.medium);
    } else if (e.target.value === "large") {
      setPrice(product.prices.large);
    } else if (e.target.value === "extralarge") {
      setPrice(product.prices.extralarge);
    }
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (id, quantity, size) => {
    dispatch(addToCart(id, quantity, size));
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Pizza added to cart", { variant: "success" });
      dispatch({ type: ADD_TO_CART_RESET });
      dispatch(getCartItems());
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
  }, [dispatch, success, error, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getRelatedProducts(id));
  }, [id, dispatch]);

  const isItemPresetInCart = cart?.items?.findIndex(
    (item) => item.product._id === id
  );
  const goTocart = () => {
    navigate("/cart");
  };
  return (
    <>
      <MainNav />
      <PageHead pageName={`Shop / ${product?.name}`} />
      <section className="flex flex-col">
        {loading ? (
          <SinglePizzaLoader />
        ) : (
          <>
            <section className="h-max flex gap-10 md:flex-col lg:p-20 md:p-10">
              <div className="flex-1 flex bg-gray-50 h-max py-20 rounded-md items-center justify-center relative">
                <span className="h-20 w-20 bg-yellow-400 absolute top-4 left-4 text-lg text-white font-bold rounded-full flex items-center justify-center">
                  -14%
                </span>
                <div className="lg:h-96 lg:w-96 md:h-[30rem] md:w-[30rem] rounded overflow-hidden drop-shadow-xl">
                  <img
                    src={product && product.image}
                    alt="pizza"
                    className={`h-full w-full object-cover`}
                    draggable="false"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <p className="font-semibold text-gray-700 uppercase text-2xl tracking-wider">
                  {product && product.name}
                </p>
                <div className="flex items-center gap-2">
                  <Rating
                    size="medium"
                    precision={0.5}
                    value={product && product.ratings ? product.ratings : 0}
                    name="controlled-rating"
                    readOnly
                  />
                  {product && product.numOfReviews === 0 ? (
                    <div className="font-light">No reviews yet</div>
                  ) : (
                    <div className="text-gray-700 font-light">
                      ({product && product.numOfReviews} Customer review)
                    </div>
                  )}
                </div>
                {product?.prices && (
                  <div className="text-2xl font-medium text-golden">
                    ₹{product.prices.regular} - ₹{product.prices.extralarge}
                  </div>
                )}
                <p className=" text-gray-500 pt-2 font-light">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima ipsum rerum, voluptatum earum provident recusandae
                  fugit dignissimos rem sint sit facere neque nesciunt porro
                  fugiat id, quisquam et! Nihil, corporis?
                </p>
                <div>
                  <h1 className="uppercase text-golden pt-4 font-medium tracking-wide">
                    Nutritional value per 100g:
                  </h1>
                  <div className="flex w-[40%] justify-between mt-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-600 font-light">Calories</span>
                      <span className="text-gray-600 font-light">Calories</span>
                      <span className="text-gray-600 font-light">Calories</span>
                      <span className="text-gray-600 font-light">Calories</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-red-600">20g</span>
                      <span className="font-medium text-red-600">20g</span>
                      <span className="font-medium text-red-600">20g</span>
                      <span className="font-medium text-red-600">20g</span>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center gap-2">
                    <span className="text-golden uppercase font-medium tracking-wide">
                      Pick Size:
                    </span>
                    <div className="bg-gray-100 w-40 flex items-center justify-between h-12 rounded-sm">
                      <select
                        className="bg-transparent appearance-none w-full text-gray-600 h-full cursor-pointer px-2"
                        onChange={handleSelectSize}
                      >
                        <option defaultValue>Select Size</option>
                        {pizzaSize.map((size, index) => (
                          <option
                            key={index}
                            value={size}
                            className="capitalize lg:text-base md:text-sm"
                          >
                            {size}
                          </option>
                        ))}
                      </select>
                      <ExpandMoreIcon fontSize="small" sx={{ color: "gray" }} />
                    </div>
                  </div>
                  <div className="flex items-center mt-6 gap-1">
                    <span className="text-golden font-medium uppercase">
                      Categories:
                    </span>
                    {product?.category?.map((cat, index) => (
                      <span
                        className="text-gray-500 font-normal tracking-wide"
                        key={index}
                      >
                        {cat}
                        {index !== product.category.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  {price && (
                    <div className="pt-6 flex items-center gap-2">
                      <span className="text-red-700 font-medium text-3xl">
                        {`₹${price}`}
                      </span>
                    </div>
                  )}
                  <div className="mt-6 flex items-center gap-6 w-max justify-center h-12 overflow-hidden">
                    <div className="h-full flex items-center justify-between w-20 border-[1px] border-gray-400 rounded-sm overflow-hidden">
                      <input
                        type="number"
                        className="w-full h-full pl-2 text-xl outer bg-transparent"
                        value={quantity}
                        readOnly={true}
                      />
                      <div className="flex flex-col justify-between items-center ">
                        <KeyboardArrowUpIcon
                          className="cursor-pointer text-gray-500"
                          onClick={handleIncrement}
                        />
                        <KeyboardArrowDownIcon
                          className="cursor-pointer text-gray-500"
                          onClick={handleDecrement}
                        />
                      </div>
                    </div>
                    <div
                      className={`${
                        isItemPresetInCart === -1
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      } text-white uppercase tracking-wide font-medium rounded h-full flex items-center justify-center lg:px-6 md:px-10  cursor-pointer`}
                      onClick={
                        isItemPresetInCart === -1
                          ? () => handleAddToCart(product._id, quantity, size)
                          : goTocart
                      }
                    >
                      {isItemPresetInCart === -1 ? "Add to cart" : "Go to cart"}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {product && <PizzaInformation id={id} pizza={product} />}
          </>
        )}

        {relatedProductLoading ? (
          <ItemSkeleton />
        ) : (
          <section className="flex flex-col gap-10 lg:py-20 md:py-10">
            <h1 className="font-medium text-golden text-2xl tracking-wider uppercase lg:mx-20 md:mx-10">
              Related products
            </h1>
            <Slider {...settings} className="overflow-hidden md:pr-10">
              {relatedProducts.map((prod) => (
                <SingleRelatedPizza
                  product={prod}
                  key={prod._id}
                  addToCart={handleAddToCart}
                />
              ))}
            </Slider>
          </section>
        )}
      </section>
      <HomeFooter />
    </>
  );
};

export default SinglePizza;
