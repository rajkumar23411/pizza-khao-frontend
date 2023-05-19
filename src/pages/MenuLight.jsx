import React, { useEffect, useState } from "react";
import MainNav from "./../components/MainNav";
import MenuLightPizza from "../components/MenuLightPizza";
import HomeFooter from "./../components/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { menuLightCategories } from "../utils";
import toaster from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { clearError } from "../redux/actions/cartActions";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./../components/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const MenuLight = () => {
  const { loading, products } = useSelector((state) => state.products);
  const { loading: cartLoading, error } = useSelector((state) => state.myCart);
  const [selectCategory, setSelectCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  const handleCategoryClick = (name) => {
    if (name === "All") {
      setSelectCategory("");
    } else {
      setSelectCategory(name);
    }
    setActiveCategory(name);
  };
  const filteredProducts = selectCategory
    ? products?.filter((product) => product.category.includes(selectCategory))
    : products;
  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
  }, [error, toaster, dispatch]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <>
      <MainNav />
      <div className="h-60 sm:h-80 w-full bg-restro-menu bg-center bg-cover bg-no-repeat">
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <h1 className="uppercase text-xs font-light sm:text-base text-white tracking-widest">
            choose your favourite
          </h1>
          <p className="text-2xl sm:text-4xl uppercase text-white  font-semibold tracking-wide">
            Menu filter light
          </p>
        </div>
      </div>
      {isSmallScreen ? (
        <div className="bg-gray-100 m-8 flex items-center justify-between h-12 rounded-2xl border-2 border-gray-200 overflow-hidden px-3">
          <select
            className="bg-transparent appearance-none w-full text-gray-600 h-full cursor-pointer px-2 capitalize"
            onChange={(e) => handleCategoryClick(e.target.value)}
            onClick={() => setIsClicked(!isClicked)}
          >
            <option value="">Select Category</option>
            {menuLightCategories.map((option, index) => (
              <option key={index} value={option.name} className="capitalize">
                {option.name}
              </option>
            ))}
          </select>
          <div className={isClicked ? null : "-rotate-180"}>
            <ExpandMoreIcon fontSize="small" sx={{ color: "gray" }} />
          </div>
        </div>
      ) : (
        <div className={`flex w-full items-center justify-center py-16 gap-10`}>
          {menuLightCategories.map((cat, i) => (
            <div
              className="flex items-center sm:gap-2 cursor-pointer menu-light-category-box"
              key={i}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className={"lg:h-12 hidden lg:block"}
              />
              <p
                className={`uppercase font-medium text-xs tracking-widest ${
                  activeCategory === cat.name ? "text-red-600" : "text-gray-500"
                }`}
              >
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <Loader />
      ) : filteredProducts?.length === 0 ? (
        <div className="flex items-center justify-center h-[26rem] flex-col gap-4">
          <img
            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/sad-cry.gif?updatedAt=1683123635643"
            alt="no data"
            draggable="false"
            className="h-32"
          />
          <h1 className="text-xl text-gray-500 font-light">
            No products available in this category
          </h1>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-y-6 place-items-center justify-center pb-5 sm:pb-20 min-h-[28rem] lg:px-20 md:px-10"
        >
          <AnimatePresence>
            {filteredProducts?.map((product, i) => (
              <MenuLightPizza key={i} product={product} loading={cartLoading} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      <HomeFooter />
    </>
  );
};

export default MenuLight;
