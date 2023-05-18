import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PagesSubMenu, SubMenu, shopSubMenu } from "../utils";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logout } from "../redux/actions/userAction";
import { motion, AnimatePresence } from "framer-motion";
const MobileMenu = ({ cart }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const variants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "100%",
      opacity: 0,
    },
  };
  const subTagVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const handleSubmenuToggle = (id) => {
    setOpenSubmenuId((prevId) => (prevId === id ? null : id));
  };
  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    enqueueSnackbar("Logged out successfully", { variant: "success" });
  };
  return (
    <nav className="flex items-center justify-between h-14 px-3">
      <NavLink to="/">
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/pngwing.com.png?updatedAt=1683699672976"
          alt="logo"
          className="h-20 cursor-pointer"
        />
      </NavLink>

      <div className="flex items-center justify-center gap-3">
        <Link to="/cart" className="relative">
          <i className="far fa-motorcycle text-xl text-gray-800"></i>
          {isAuthenticated && (
            <span className="absolute -left-2 -top-1 h-4 w-4 bg-red-700 rounded-full flex items-center justify-center text-xs text-white">
              {cart?.items?.length}
            </span>
          )}
        </Link>
        <div onClick={handleShowSearchBar}>
          <i className="far fa-search text-gray-800 text-lg"></i>
        </div>
        <div
          onClick={() => setIsMenuOpen(true)}
          className="h-8 w-8 bg-sky-50 flex items-center justify-center rounded"
        >
          <i className="far fa-bars text-xl text-gray-700"></i>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.1 }}
            className={`fixed top-0 left-0 bottom-0 w-full h-full bg-white z-40 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "right-0 " : "-right-full hidden"
            }`}
          >
            <div
              className="absolute right-4 top-4 bg-slate-50 p-2 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <CloseIcon className="text-gray-600" />
            </div>
            <div className="py-20 px-10 w-full">
              <div className="flex flex-col w-full">
                <div className="border-b-2 border-dashed border-golden py-2">
                  <NavLink to="/" className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm tracking-wider font-normal uppercase">
                      Home
                    </span>
                    <i
                      className="fal fa-angle-right text-lg font-normal text-gray-700"
                      aria-hidden="true"
                    ></i>
                  </NavLink>
                </div>
                <div
                  className="flex flex-col py-2"
                  onClick={() => handleSubmenuToggle("pages")}
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-golden">
                    <span className="text-gray-600 text-sm tracking-wider font-normal uppercase">
                      Pages
                    </span>
                    <div
                      className={`fal fa-angle-right text-lg font-normal ${
                        openSubmenuId === "pages" && "rotate-90"
                      }`}
                      aria-hidden="true"
                    ></div>
                  </div>

                  {openSubmenuId === "pages" && (
                    <motion.div
                      className="flex flex-col gap-4 pt-4 ml-8"
                      variants={subTagVariants}
                      initial="hidden"
                      animate={openSubmenuId === "pages" ? "visible" : "hidden"}
                    >
                      {PagesSubMenu.map((item, i) => (
                        <motion.span
                          variants={listVariants}
                          transition={{ duration: 0.3 }}
                          className="border-b-2 border-dashed border-golden text-gray-600 font-normal uppercase text-sm py-1"
                          key={i}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </div>
                <div
                  className="flex flex-col py-2"
                  onClick={() => handleSubmenuToggle("menu")}
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-golden">
                    <span className="text-gray-600 text-sm tracking-wider font-normal uppercase">
                      Menu
                    </span>
                    <div
                      className={`fal fa-angle-right text-lg font-normal ${
                        openSubmenuId === "menu" && "rotate-90"
                      }`}
                      aria-hidden="true"
                    ></div>
                  </div>
                  {openSubmenuId === "menu" && (
                    <motion.div
                      className="flex flex-col gap-4 pt-4 ml-8"
                      variants={subTagVariants}
                      initial="hidden"
                      animate={openSubmenuId === "menu" ? "visible" : "hidden"}
                    >
                      {SubMenu.map((item, i) => (
                        <Link
                          className="border-b-2 border-dashed border-golden text-gray-600 font-normal uppercase text-sm py-1 tracking-wide"
                          to={item.link}
                          key={i}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
                <div
                  className="flex flex-col py-2"
                  onClick={() => handleSubmenuToggle("shop")}
                >
                  <div className="flex items-center justify-between border-b-2 border-dashed border-golden">
                    <span className="text-gray-600 text-sm tracking-wider font-normal uppercase">
                      Shop
                    </span>
                    <div
                      className={`fal fa-angle-right text-lg font-normal ${
                        openSubmenuId === "shop" && "rotate-90"
                      }`}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div
                    className={`flex-col gap-4 pt-4 ml-8 ${
                      openSubmenuId === "shop"
                        ? "max-h-full flex"
                        : "max-h-0 hidden"
                    }`}
                  >
                    {shopSubMenu.map((item, i) => (
                      <Link
                        to={item.link}
                        className="border-b-2 border-dashed border-golden text-gray-600 font-normal uppercase text-sm py-1 tracking-wide"
                        key={i}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {isAuthenticated ? (
                      <p
                        className="border-b-2 border-dashed border-golden flex items-center justify-between gap-1"
                        onClick={logoutHandler}
                      >
                        <span className=" text-gray-600 font-normal uppercase text-sm py-1 tracking-wide">
                          Logout
                        </span>
                        <PowerSettingsNewIcon
                          fontSize="small"
                          className="text-gray-400"
                        />
                      </p>
                    ) : (
                      <Link
                        to="/login"
                        className="border-b-2 border-dashed border-golden flex items-center justify-between gap-1"
                      >
                        <span className=" text-gray-600 font-normal uppercase text-sm py-1 tracking-wide">
                          Login/Sign up
                        </span>
                        <div
                          className={`fal fa-angle-right text-lg font-normal`}
                          aria-hidden="true"
                        ></div>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="border-b-2 border-dashed border-golden py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm tracking-wider font-normal uppercase">
                      Blog
                    </span>
                    <i
                      className="fal fa-angle-right text-lg font-normal text-gray-700"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showSearchBar && (
        <SearchBar
          onClose={() => setShowSearchBar(false)}
          showSearchBar={showSearchBar}
        />
      )}
    </nav>
  );
};

export default MobileMenu;
