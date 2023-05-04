import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import SinglePizzaCard from "./SinglePizzaCard";

import ItemSkeleton from "./ItemSkeleton";

const HomeMenu = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="lg:h-screen md:h-[60vh] lg:pt-20 md:pt-20 pt-10">
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
        products && <SinglePizzaCard products={products} />
      )}
    </div>
  );
};

export default HomeMenu;
