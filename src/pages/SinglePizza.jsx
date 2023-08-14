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
import { Rating, useMediaQuery } from "@mui/material";
import SinglePizzaLoader from "../components/SinglePizzaLoader";
import {
  addToCart,
  clearError,
  getCartItems,
} from "../redux/actions/cartActions";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import PageHead from "../components/PageHead";
import toaster from "react-hot-toast";
import SavorySuggestion from "../components/SavorySuggestion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import SinglePizzaCard from "../components/SinglePizzaCard";

const SinglePizza = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);

  const {
    success,
    error,
    cart,
    loading: cartLoading,
  } = useSelector((state) => state.myCart);
  const { loading: relatedProductLoading, relatedProducts } = useSelector(
    (state) => state.relatedProducts
  );

  const [price, setPrice] = useState();
  const [size, setSize] = useState(product ? "regular" : "");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [loadingProductId, setLoadingProductId] = useState(null);
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
    setLoadingProductId(id);
    dispatch(addToCart(id, quantity, size));
  };
  useEffect(() => {
    if (success) {
      toaster.success("Pizza added to cart");
      dispatch({ type: ADD_TO_CART_RESET });
      dispatch(getCartItems());
      setLoadingProductId(null);
    }
    if (error) {
      toaster.error(error);
      dispatch(clearError());
      setLoadingProductId(null);
    }
  }, [dispatch, success, error]);

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
      {product?.name && <PageHead pageName={`Shop / ${product?.name}`} />}
      <section className="flex flex-col">
        {loading ? (
          <SinglePizzaLoader />
        ) : (
          <>
            <section className="h-max flex gap-10 flex-col lg:flex-row lg:p-20 md:p-10">
              <div className="flex-1 flex bg-gray-50 h-max py-20 rounded-md items-center justify-center relative">
                <span className="h-20 w-20 bg-yellow-400 absolute top-4 left-4 text-lg text-white font-bold rounded-full flex items-center justify-center">
                  -14%
                </span>
                <div className="h-80 w-80 lg:h-96 lg:w-96 md:h-[30rem] md:w-[30rem] rounded overflow-hidden drop-shadow-xl">
                  <img
                    src={product && product.image}
                    alt="pizza"
                    className={`h-full w-full object-cover`}
                    draggable="false"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 p-5 sm:p-0">
                <p className="font-semibold text-gray-700 uppercase text-xl sm:text-2xl tracking-wider">
                  {product && product.name}
                </p>
                <div className="flex items-center gap-2">
                  <Rating
                    size={isSmallScreen ? "small" : "medium"}
                    precision={0.5}
                    value={product && product.ratings ? product.ratings : 0}
                    name="controlled-rating"
                    readOnly
                  />
                  {product && product.numOfReviews === 0 ? (
                    <div className="font-light text-xs sm:text-base">
                      No reviews yet
                    </div>
                  ) : (
                    <div className="text-gray-700 font-light text-xs sm:text-base">
                      ({product && product.numOfReviews} Customer review)
                    </div>
                  )}
                </div>
                {product?.prices && (
                  <div className="text-xl sm:text-2xl font-medium text-golden">
                    ₹{product.prices.regular} - ₹{product.prices.extralarge}
                  </div>
                )}
                <p className=" text-gray-500 pt-1 sm:pt-2 font-light text-xs sm:text-base">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima ipsum rerum, voluptatum earum provident recusandae
                  fugit dignissimos rem sint sit facere neque nesciunt porro
                  fugiat id, quisquam et! Nihil, corporis?
                </p>
                <div>
                  <h1 className="uppercase text-golden pt-4 font-medium tracking-wide">
                    Nutritional value per 100g:
                  </h1>
                  <div className="flex w-[70%] sm:w-[40%] justify-between mt-4">
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
                    <span className="text-golden uppercase font-medium tracking-wide text-sm sm:text-base">
                      Pick Size:
                    </span>
                    <div className="bg-gray-100 w-40 flex items-center justify-between h-10 sm:h-12 rounded-sm">
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
                    <span className="text-golden font-medium uppercase text-sm sm:text-base">
                      Categories:
                    </span>
                    {product?.category?.map((cat, index) => (
                      <span
                        className="text-gray-500 font-normal tracking-wide text-sm sm:text-base"
                        key={index}
                      >
                        {cat}
                        {index !== product.category.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                  {price && (
                    <div className="pt-6 flex items-center gap-2">
                      <span className="text-red-700 font-medium text-xl sm:text-3xl">
                        {`₹${price}`}
                      </span>
                    </div>
                  )}
                  <div className="mt-6 flex items-center gap-6 w-max justify-center h-10 sm:h-12 overflow-hidden">
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
                          fontSize={isSmallScreen ? "small" : "medium"}
                        />
                        <KeyboardArrowDownIcon
                          className="cursor-pointer text-gray-500"
                          onClick={handleDecrement}
                          fontSize={isSmallScreen ? "small" : "medium"}
                        />
                      </div>
                    </div>
                    <button
                      className={`${
                        isItemPresetInCart === -1
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      } text-white uppercase tracking-wide text-sm sm:text-base font-normal rounded h-full flex items-center justify-center px-4 lg:px-6 md:px-10 cursor-pointer`}
                      onClick={
                        isItemPresetInCart === -1
                          ? () => handleAddToCart(product._id, quantity, size)
                          : goTocart
                      }
                    >
                      {isItemPresetInCart === -1 ? "Add to cart" : "Go to cart"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {product && <PizzaInformation id={id} pizza={product} />}
          </>
        )}
        {isItemPresetInCart >= 0 && (
          <SavorySuggestion isItemInCart={isItemPresetInCart} />
        )}
        {loading && relatedProductLoading ? (
          <div className="mb-10">
            <ItemSkeleton />
          </div>
        ) : (
          relatedProducts?.length > 0 && (
            <div className="m-5 md:m-10 lg:my-10 lg:mx-20">
              <h1 className="font-medium text-golden text-base sm:text-2xl tracking-wider uppercase">
                Related products
              </h1>
              <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={5}
                navigation
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  300: {
                    slidesPerView: 3,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  780: {
                    slidesPerView: 4,
                    spaceBetween: 60,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
                className="mySwiper"
              >
                {relatedProducts?.map((product) => (
                  <SwiperSlide key={product._id}>
                    <SinglePizzaCard pizza={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )
        )}
      </section>
      <HomeFooter />
    </>
  );
};

export default SinglePizza;
