import React, { useEffect, useState } from "react";
import MainNav from "./../components/MainNav";
import MenuLightPizza from "../components/MenuLightPizza";
import HomeFooter from "./../components/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { menuLightCategories } from "../utils";
import { useSnackbar } from "notistack";
import { Pagination, Stack } from "@mui/material";
import { clearError } from "../redux/actions/cartActions";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./../components/Loader";
import { ProductFiltering } from "../utils/ProductFiltering";
const MenuLight = () => {
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );
  const { error } = useSelector((state) => state.myCart);
  const [selectCategory, setSelectCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    setCurrentPageNo,
    handlePageChange,
    totalProducts,
    displayProducts,
    totalPages,
    currentPage,
    resultPerPage,
    filteredProducts,
  } = ProductFiltering(products, selectCategory, productsCount);

  const handleCategoryClick = (name) => {
    if (name === "All") {
      setSelectCategory("");
    } else {
      setSelectCategory(name);
    }
    setActiveCategory(name);
    setCurrentPageNo(1);
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
  }, [error, enqueueSnackbar]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <>
      <MainNav />
      <div className="h-80 w-full bg-restro-menu bg-center bg-cover bg-no-repeat">
        <div className="flex items-center justify-center flex-col gap-2 h-full w-full">
          <h1 className=" uppercase text-base text-white tracking-widest">
            choose your favourite
          </h1>
          <p className="text-4xl uppercase text-white  font-semibold tracking-wide">
            Menu filter light
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-16 gap-10">
        {menuLightCategories.map((cat, i) => (
          <div
            className="flex items-center gap-2 cursor-pointer menu-light-category-box"
            key={i}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className={cat.name === "All" && "h-12"}
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
      {loading ? (
        <Loader />
      ) : filteredProducts?.length === 0 ? (
        <div className="flex items-center justify-center h-[26rem] flex-col gap-4">
          <img
            src="/images/sad-cry.gif"
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
          className="grid grid-cols-4 gap-y-6 place-items-center justify-center pb-20 min-h-[28rem] px-20"
        >
          <AnimatePresence>
            {displayProducts?.map((product, i) => (
              <MenuLightPizza key={i} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {totalProducts > resultPerPage && (
        <div className="grid place-items-center mb-10">
          <Stack>
            <Pagination
              onChange={handlePageChange}
              page={currentPage}
              count={totalPages}
              shape="rounded"
              size="large"
            />
          </Stack>
        </div>
      )}
      <HomeFooter />
    </>
  );
};

export default MenuLight;
