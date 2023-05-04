import React from "react";
import BannerNav from "./BannerNav";
import { motion } from "framer-motion";
const Banner = () => {
  return (
    <div className="lg:h-screen md:h-[75vh] w-full bg-[#D1411E] relative h-[70vh]">
      <BannerNav />
      <div className="imageDiv h-full w-full flex items-center justify-center flex-col">
        <motion.img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/crown.png?updatedAt=1683123622054"
          alt="crown"
          className="absolute top-36 left-[21%] h-20"
        />
        <motion.img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/new-menu.png?updatedAt=1683123629393"
          className="h-10"
          alt="New Menu"
        />
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/pizza-time.png?updatedAt=1683123631900"
          alt="pizza time"
          className="h-20"
        />
        <div className="hidden sm:grid bg-[#FFA323] h-32 w-32 rounded-full  place-items-center text-xl uppercase tracking-wider text-center font-bold text-white absolute top-24 right-[21%]">
          Best Offer
        </div>
      </div>
    </div>
  );
};
export default Banner;
