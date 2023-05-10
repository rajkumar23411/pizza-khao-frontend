import React, { useEffect } from "react";
import Banner from "../components/Banner";
import BuildPizza from "../components/BuildPizza";
import Events from "../components/Events";
import HomeFooter from "../components/HomeFooter";
import HomeMenu from "../components/HomeMenu";
import Options from "../components/Options";
import PizzaBox from "../components/PizzaBox";
import Quotes from "../components/Quotes";
import { useMediaQuery } from "@mui/material";
import MobileMenu from "../components/MobileMenu";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { cart } = useSelector((state) => state.myCart);
  const [isWindowLoading, setIsWindowLoading] = React.useState(true);
  const { pathname } = useLocation();
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsWindowLoading(false);
    });
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <section className="overflow-hidden">
      {isWindowLoading ? (
        <motion.div
          className="w-screen h-screen flex items-center justify-center"
          initial={{ opacity: 0, scale: 10 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: 0, delay: 0.5 }}
        >
          <div className="flex items-center justify-center flex-col">
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/logo_C0ZhYDynQ?updatedAt=1683731113359"
              alt="Logo"
              className="sm:h-52"
            />
            <span className="uppercase font-light tracking-widest text-3xl text-red-500">
              Slice of heaven
            </span>
          </div>
        </motion.div>
      ) : (
        <>
          {isSmallScreen && <MobileMenu cart={cart} />}
          <Banner />
          <Options />
          <BuildPizza />
          <HomeMenu />
          <Events />
          <PizzaBox />
          <Quotes />
          <HomeFooter />
        </>
      )}
    </section>
  );
};

export default Home;
