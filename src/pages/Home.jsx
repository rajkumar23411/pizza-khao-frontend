import React from "react";
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
import HomeCategory from "../components/HomeCategory";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { cart } = useSelector((state) => state.myCart);

  return (
    <>
      {isSmallScreen && <MobileMenu cart={cart} />}
      <Banner />
      <Options />
      <BuildPizza />
      <HomeCategory />
      <HomeMenu />
      <Events />
      <PizzaBox />
      <Quotes />
      <HomeFooter />
    </>
  );
};

export default Home;
