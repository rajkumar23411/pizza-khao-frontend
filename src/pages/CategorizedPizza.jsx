import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categorizedProducts } from "../redux/actions/productAction";
import toaster from "react-hot-toast";
import MainNav from "./../components/MainNav";
import {
  cheeseText,
  forKidsText,
  piquantText,
  veggieText,
} from "./../utils/index";
import PlaceHolderCard from "./../components/PlaceHolderCard";
import SinglePizzaCard from "./../components/SinglePizzaCard";

const CategorizedPizza = () => {
  const location = useLocation();
  const category = location.search.split("=")[1];
  const formattedCategory = category.split("-").join(" ");
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  const array =
    formattedCategory === "cheese"
      ? cheeseText
      : formattedCategory === "veggie"
      ? veggieText
      : formattedCategory === "piquant"
      ? piquantText
      : formattedCategory === "for kids"
      ? forKidsText
      : null;
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomText = array[randomIndex];
  useEffect(() => {
    dispatch(categorizedProducts(category));
    if (error) {
      toaster.error(error);
    }
  }, [dispatch, category, error]);

  return (
    <section className="h-full w-full">
      <MainNav />
      <div className="h-60 sm:h-80 w-full category_page">
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <p className="text-2xl sm:text-4xl uppercase text-white  font-semibold tracking-wide">
            {formattedCategory}
          </p>
          <h1 className="normal-case font-roboto text-xs font-light sm:text-base text-white tracking-wide">
            {randomText}
          </h1>
        </div>
      </div>
      {loading ? (
        <div className="flex-1 md:my-10 lg:m-0">
          <div className="grid lg:grid-cols-3 gap-y-4 sm:gap-y-0 py-6 sm:py-0 grid-cols-2 lg:gap-6 md:gap-4 place-items-center place-content-start h-full">
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <PlaceHolderCard key={i} />
              ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center place-content-center place-items-center py-10 md:p-10">
          {products?.map((product) => (
            <SinglePizzaCard pizza={product} key={product._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorizedPizza;
