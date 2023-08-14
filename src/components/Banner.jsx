import React from "react";
import BannerNav from "./BannerNav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
const ImageBlock = ({ imageMain, imageHeading }) => {
  return (
    <div className="h-screen w-sch-screen relative drop-shadow-2xl">
      <img
        src={imageMain}
        alt="asset"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-max w-max"
      />
      <img
        src={imageHeading}
        alt="heading"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 md:h-max md:w-max"
      />
      <img
        src="/assets/h6-rev-img-6.png"
        alt="small heading"
        className="absolute top-[44%] md:top-[38%] left-1/2 transform -translate-x-1/2 -translate-y-[44%] md:-translate-y-[38%] w-48 md:h-max md:w-max "
      />
      <img
        src="/assets/h6-rev-img-4.png"
        alt="crown"
        className="absolute top-[36%] md:top-96 lg:top-20 left-[25%] transform -translate-y-[36%] -translate-x-[25%] w-20 md:h-max md:w-max"
      />
    </div>
  );
};
const Banner = () => {
  return (
    <section className="h-[80vh] lg:h-screen md:h-[75vh] w-full bg-[#D1411E] overflow-hidden md:bg-banner-background md:bg-no-repeat md:bg-cover relative flex items-center justify-center">
      <BannerNav />
      <img
        src="/assets/samuel-richard-UWY8nGROvbk-unsplash.jpg"
        alt=""
        className="md:hidden absolute h-full w-full top-0 left-0 right-0 object-cover mix-blend-screen"
      />
      <div className="h-full w-full">
        <Swiper
          modules={[Navigation, Autoplay, EffectCube, Pagination]}
          effect={"cube"}
          navigation={true}
          autoplay={{ delay: 3000 }}
          className="mySwiper"
          grabCursor={true}
          pagination={true}
          cubeEffect={{
            shadow: true,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
        >
          <SwiperSlide>
            <ImageBlock
              imageMain={"/assets/h6-rev-img-8.png"}
              imageHeading={"/assets/h6-rev-img-7.png"}
            />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <ImageBlock
              imageMain={"/assets/h6-rev-img-3.png"}
              imageHeading={"/assets/h6-rev-img-7.png"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ImageBlock
              imageMain={"/assets/h6-rev-img-9.png"}
              imageHeading={"/assets/h6-rev-img-7.png"}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
export default Banner;
