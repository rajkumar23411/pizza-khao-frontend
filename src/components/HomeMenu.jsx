import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import SinglePizzaCard from "./SinglePizzaCard";
import ItemSkeleton from "./ItemSkeleton";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { clearError } from "../redux/actions/cartActions";
import toaster from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/thumbs";

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
    }, [dispatch, success, error]);
    return (
        <div className="lg:h-[76vh] md:h-[60vh] lg:pt-20 md:pt-20 pt-10">
            <div className="w-full flex items-center justify-center flex-col gap-1 pb-10">
                <h3 className="text-xs sm:text-lg text-purple-600">
                    Choose your flavor
                </h3>
                <h1 className="text-2xl lg:text-3xl md:text-2xl uppercase font-oswald font-medium text-gray-700">
                    The best pizza menu in town
                </h1>
                <p className="w-full px-6 text-xs lg:w-1/2 md:w-2/3 text-gray-500 lg:text-base md:text-base text-center font-light">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Explicabo quidem dolore iure sequi cupiditate atque?
                    Veritatis non labore obcaecati consequatur?
                </p>
            </div>
            {loading ? (
                <ItemSkeleton />
            ) : (
                products && (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={5}
                        navigation
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            250: {
                                slidesPerView: 2,
                            },
                            350: {
                                slidesPerView: 3,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
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
                )
            )}
        </div>
    );
};

export default HomeMenu;
