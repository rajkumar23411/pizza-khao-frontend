import React, { useEffect, useState } from "react";
import { randomSuggestionText } from "../utils";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import SinglePizzaCard from "./SinglePizzaCard";
const SavorySuggestion = ({ isItemInCart }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products/complementry");
      if (data.success) setProducts(data.products);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isItemInCart >= 0) fetchProducts();
    else return;
  }, [isItemInCart]);
  return (
    <section className="mx-5 lg:mx-20 md:mx-10">
      <div>
        <h1 className="font-medium text-golden text-base sm:text-2xl tracking-wider uppercase">
          Drinks & Desserts
        </h1>
        <p className="font-sans text-gray-600 text-xs md:text-sm lg:text-base">
          {randomSuggestionText()}
        </p>
      </div>
      <div>
        {!loading && products.length > 0 && (
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
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="mySwiper"
          >
            {products?.map((pizza) => (
              <SwiperSlide key={pizza._id}>
                <SinglePizzaCard pizza={pizza} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default SavorySuggestion;
