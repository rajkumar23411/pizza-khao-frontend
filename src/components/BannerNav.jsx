import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/actions/cartActions";
import { logout } from "../redux/actions/userAction";
import { PagesSubMenu } from "../utils";
import toaster from "react-hot-toast";
export const MenuSubTags = [
  { name: "Our popular pizzas", link: "/menu" },
  { name: "Menu filter light", link: "/menu-light" },
  { name: "Resturent Menu", link: "/resturent-menu" },
];

const BannerNav = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(0);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };
  const toggleMenu = (index) => {
    setIsModelOpen(index);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toaster.success("Logged out successfully");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowSearchBar(false);
      }
    };
    dispatch(getCartItems());
    window.addEventListener("scroll", handleScroll);
  }, [dispatch]);
  return (
    <>
      <nav className="hidden md:flex items-center justify-evenly absolute w-full -top-3 z-10">
        <div className="flex items-center justify-center gap-4 md:gap-2">
          <div className="bg-white rounded-full p-3 md:p-2">
            <PhoneEnabledOutlinedIcon className="text-lg text-red-600" />
          </div>
          <p className="flex flex-col">
            <span className="uppercase font-normal text-white text-sm tracking-widest md:tracking-wide md:text-xs">
              ORDER IT NOW
            </span>
            <span className="text-white font-medium text-xl md:text-sm">
              91333 46789
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center lg:gap-8 md:gap-4 relative">
          <Link className="uppercase tracking-widest text-white font-medium text-sm">
            Home
          </Link>
          <Link
            className="uppercase tracking-widest text-white font-medium text-sm relative"
            onMouseEnter={() => toggleMenu(1)}
            onMouseLeave={() => toggleMenu(0)}
          >
            Pages
            <ul
              className={`${
                isModelOpen === 1 ? "nav-links active" : "nav-links"
              } bg-white`}
            >
              {PagesSubMenu.map((item, index) => (
                <li
                  className="tracking-wide lg:font-medium md:font-normal text-gray-600 text-sm hover:bg-red-50 hover:text-red-600"
                  key={index}
                >
                  {item}
                </li>
              ))}
              {isAuthenticated && user && user.role === "admin" && (
                <NavLink to="/add/pizza">
                  <li className="tracking-wide font-medium text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 hover:font-semibold">
                    Add a pizza
                  </li>
                </NavLink>
              )}
            </ul>
          </Link>
          <Link
            className="uppercase tracking-widest text-white font-medium text-sm relative"
            onMouseEnter={() => toggleMenu(2)}
            onMouseLeave={() => toggleMenu(0)}
          >
            Menu
            <ul
              className={`${
                isModelOpen === 2 ? "nav-links active" : "nav-links"
              } h-12`}
            >
              {MenuSubTags.map((item, index) => (
                <NavLink to={item.link} key={index}>
                  <li className="tracking-wide font-medium text-sm hover:bg-red-50  hover:text-red-600 text-gray-700">
                    {item.name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </Link>
          <Link>
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/pngwing.com.png?updatedAt=1683699672976"
              alt="logo"
              className="lg:h-32 md:h-28  object-cover"
            />
          </Link>
          <Link className="uppercase tracking-widest text-white font-medium text-sm">
            Event
          </Link>
          <Link className="uppercase tracking-widest text-white font-medium text-sm">
            Blog
          </Link>
          {isAuthenticated ? (
            <Link
              className="uppercase tracking-widest text-white font-medium text-sm"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="uppercase tracking-widest text-white font-medium text-sm"
            >
              Login
            </Link>
          )}
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center justify-center gap-1 relative cursor-pointer">
            {cart && cart.items && (
              <span className="absolute -left-2 -top-1 bg-white text-red-600 font-extrabold h-4 w-4 rounded-full flex items-center justify-center text-xs">
                {cart.items.length === 0 ? 0 : cart.items.length}
              </span>
            )}
            <Link
              className="text-white uppercase tracking-widest font-medium text-sm"
              to="/cart"
            >
              <MopedOutlinedIcon sx={{ color: "white" }} fontSize="medium" />
              Cart
            </Link>
          </div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={handleShowSearchBar}
          >
            <SearchOutlinedIcon sx={{ color: "white" }} fontSize="small" />
            <span className="text-white uppercase tracking-widest font-medium text-sm">
              Search
            </span>
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

export default BannerNav;
