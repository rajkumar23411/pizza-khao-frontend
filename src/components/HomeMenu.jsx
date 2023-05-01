import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import SinglePizzaCard from "./SinglePizzaCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../utils/Arrows";
import ItemSkeleton from "./ItemSkeleton";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { useSnackbar } from "notistack";
import { clearError } from "../redux/actions/cartActions";
const HomeMenu = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { success, error } = useSelector((state) => state.myCart);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (success) {
      enqueueSnackbar("Pizza added to cart", { variant: "success" });
      dispatch({ type: ADD_TO_CART_RESET });
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
  }, [success, error, enqueueSnackbar]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="lg:h-screen md:h-[60vh] pt-20 ">
      <div className="w-full flex items-center justify-center flex-col gap-1 pb-10">
        <h3 className="text-base uppercase tracking-wider text-[#D1411E] font-light">
          Choose your flavor
        </h3>
        <h1 className="lg:text-3xl md:text-2xl uppercase font-medium text-gray-500">
          The best pizza menu in town
        </h1>
        <p className="lg:w-1/2 md:w-2/3 text-gray-500 text-base text-center font-light">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          quidem dolore iure sequi cupiditate atque? Veritatis non labore
          obcaecati consequatur?
        </p>
      </div>
      {loading ? (
        <ItemSkeleton />
      ) : (
        <Slider {...settings} className="overflow-hidden">
          {products?.map((pizza) => (
            <SinglePizzaCard pizza={pizza} key={pizza.path} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeMenu;
