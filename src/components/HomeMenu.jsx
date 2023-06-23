import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import SinglePizzaCard from "./SinglePizzaCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemSkeleton from "./ItemSkeleton";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { clearError } from "../redux/actions/cartActions";
import toaster from "react-hot-toast";
import { settings } from "./Arrows";
const HomeMenu = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);
  const { success, error } = useSelector((state) => state.myCart);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (success) {
      toaster.success("Item added to cart");
      dispatch({ type: ADD_TO_CART_RESET });
    }
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
  }, [dispatch, success, error, toaster]);
  return (
    <div className="lg:h-[76vh] md:h-[60vh] lg:pt-20 md:pt-20 pt-10">
      <div className="w-full flex items-center justify-center flex-col gap-1 pb-10">
        <h3 className="text-xs lg:text-base md:text-base uppercase tracking-wider text-[#D1411E] font-light">
          Choose your flavor
        </h3>
        <h1 className="text-2xl lg:text-3xl md:text-2xl uppercase font-medium text-gray-700">
          The best pizza menu in town
        </h1>
        <p className="w-full px-6 text-xs lg:w-1/2 md:w-2/3 text-gray-500 lg:text-base md:text-base text-center font-light">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          quidem dolore iure sequi cupiditate atque? Veritatis non labore
          obcaecati consequatur?
        </p>
      </div>
      {loading ? (
        <ItemSkeleton />
      ) : (
        products && (
          <Slider {...settings}>
            {products?.map((pizza) => (
              <SinglePizzaCard key={pizza._id} pizza={pizza} />
            ))}
          </Slider>
        )
      )}
    </div>
  );
};

export default HomeMenu;
