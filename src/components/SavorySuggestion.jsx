import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import PizzaCard from "./PizzaCard";

const SavorySuggestion = ({ fetchItem }) => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
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
        if (fetchItem >= 0) fetchProducts();
        else return;
    }, [fetchItem]);

    return (
        <section className="mx-5 py-5 lg:mx-20 lg:my-10 md:mx-10">
            <div>
                <h1 className="font-medium text-golden text-base sm:text-2xl tracking-wider uppercase">
                    Drinks & Desserts
                </h1>
            </div>
            <div className="mt-6">
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
                                <PizzaCard
                                    product={pizza}
                                    primaryBtn={"ADD TO CART"}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default SavorySuggestion;
