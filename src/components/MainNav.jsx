import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/actions/cartActions";
import { PagesSubMenu, SubMenu, shopSubMenu } from "../utils";
import { useMediaQuery } from "@mui/material";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";
const MainNav = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(0);
  const { cart } = useSelector((state) => state.myCart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const toggleMenu = (index) => {
    setIsModelOpen(index);
  };
  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSearchBar(false);
      }
    };
    dispatch(getCartItems());
    window.addEventListener("scroll", handleScroll);
  }, [dispatch]);
  return isSmallScreen ? (
    isSmallScreen && <MobileMenu cart={cart} />
  ) : (
    <>
      <nav className="w-full flex items-center justify-between lg:px-10 md:px-5 h-20">
        <div className="h-full">
          <ul className="flex items-center h-full justify-center">
            <NavLink to="/">
              <img
                src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/pngwing.com.png?updatedAt=1683699672976"
                alt="logo"
                className="lg:h-28 md:h-24 cursor-pointer"
              />
            </NavLink>
            <NavLink
              to="/"
              className="uppercase text-gray-600 font-medium tracking-widest h-full grid place-items-center text-xs cursor-pointer pr-5 pl-10"
            >
              Home
            </NavLink>
            <li
              className="uppercase text-gray-600 font-medium tracking-widest relative cursor-pointer h-full grid place-items-center text-xs px-5"
              onMouseEnter={() => toggleMenu(1)}
              onMouseLeave={() => toggleMenu(0)}
            >
              Pages
              <motion.ul
                className={`${
                  isModelOpen === 1 ? "scale-100 h-max" : "scale-0 h-0"
                }  absolute w-[16rem] bg-white top-full left-0 flex flex-col justify-between transition-all duration-300 origin-top-left overflow-hidden h-max shadow-md rounded`}
              >
                {PagesSubMenu.map((item, index) => (
                  <li
                    className="tracking-wide font-medium text-sm hover:bg-red-50 hover:text-red-600 px-6 py-3"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
                {isAuthenticated && user?.role === "admin" && (
                  <li className="tracking-wide font-medium text-sm hover:bg-red-50 hover:text-red-600 px-6 py-3">
                    <NavLink to="/add/pizza">Add a pizza</NavLink>
                  </li>
                )}
              </motion.ul>
            </li>
            <li
              className="uppercase text-gray-600 font-medium tracking-widest relative cursor-pointer h-full grid place-items-center text-xs px-5"
              onMouseEnter={() => toggleMenu(2)}
              onMouseLeave={() => toggleMenu(0)}
            >
              Menu
              <ul
                className={`${
                  isModelOpen === 2 ? "scale-100 h-max" : "scale-0 h-0"
                }  absolute w-[16rem] bg-white top-full left-0 flex flex-col justify-between transition-all duration-300 origin-top-left overflow-hidden h-max shadow-md rounded`}
              >
                {SubMenu.map((item, index) => (
                  <li
                    className="tracking-wide font-medium text-sm hover:bg-red-50 hover:text-red-600 px-6 py-3"
                    key={index}
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              onMouseEnter={() => toggleMenu(3)}
              onMouseLeave={() => toggleMenu(0)}
              className="uppercase text-gray-600 font-medium tracking-widest h-full grid place-items-center text-xs cursor-pointer relative px-5"
            >
              Shop
              <ul
                className={`${
                  isModelOpen === 3 ? "scale-100 h-max" : "scale-0 h-0"
                }  absolute w-[16rem] bg-white top-full left-0 flex flex-col justify-between transition-all duration-300 origin-top-left overflow-hidden h-max shadow-md rounded`}
              >
                {shopSubMenu.map((item, index) => (
                  <li
                    key={index}
                    className="tracking-wide font-medium text-sm hover:bg-red-50 hover:text-red-600 px-6 py-3"
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="uppercase text-gray-600 font-medium tracking-widest h-full grid place-items-center text-xs cursor-pointer px-5">
              Event
            </li>
            <li className="uppercase text-gray-600 font-medium tracking-widest h-full grid place-items-center text-xs cursor-pointer px-5">
              Blog
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center lg:gap-12 md:gap-8">
          <Link to="/cart">
            <div className="cursor-pointer uppercase text-xs text-gray-600 font-medium tracking-wide flex items-center justify-center gap-1 relative">
              {cart && cart.items && (
                <span className="absolute -left-3 -top-1 bg-gray-700 text-white h-4 w-4 rounded-full flex items-center justify-center text-xs">
                  {cart.items.length === 0 ? 0 : cart.items.length}
                </span>
              )}
              <MopedOutlinedIcon fontSize="medium" className="text-gray-600" />
              <span>Cart</span>
            </div>
          </Link>
          <div
            className="cursor-pointer uppercase text-xs text-gray-600 font-medium tracking-wide flex items-center justify-center gap-1"
            onClick={handleShowSearchBar}
          >
            <SearchOutlinedIcon fontSize="medium" className="text-gray-600" />
            <span>Search</span>
          </div>
        </div>
      </nav>
      {showSearchBar && (
        <SearchBar
          onClose={() => setShowSearchBar(false)}
          showSearchBar={showSearchBar}
        />
      )}
    </>
  );
};

export default MainNav;
