import React from "react";
import Banner from "../components/Banner";
import BuildPizza from "../components/BuildPizza";
import Events from "../components/Events";
import HomeFooter from "../components/HomeFooter";
import HomeMenu from "../components/HomeMenu";
import Options from "../components/Options";
import PizzaBox from "../components/PizzaBox";
import Quotes from "../components/Quotes";

const Home = () => {
  return (
    <>
      <Banner />
      <Options />
      <BuildPizza />
      <HomeMenu />
      <Events />
      <PizzaBox />
      <Quotes />
      <HomeFooter />
    </>
  );
};

export default Home;
