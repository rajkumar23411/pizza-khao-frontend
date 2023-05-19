import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
const SearchBar = ({ onClose, showSearchBar }) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu/${keyword}`);
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <motion.div
      initial={{ height: 0, width: "100%", opacity: 0 }}
      animate={{
        height: showSearchBar ? "auto" : 0,
        opacity: showSearchBar ? 1 : 0,
        width: showSearchBar ? "100%" : "0%",
      }}
      transition={{ duration: 0.1 }}
      className="fixed top-0 left-0 right-0 w-full bg-white z-40"
    >
      <form
        className="w-full h-16 sm:h-20 flex items-center justify-center px-5 sm:px-10 gap-4"
        onSubmit={searchHandler}
      >
        <button type="submit">
          <SearchIcon
            className="w-full"
            fontSize={isSmallScreen ? "small" : "large"}
            sx={{ color: "rgba(0,0,0,0.6)" }}
          />
        </button>
        <input
          type="text"
          placeholder="Search something here..."
          className="h-full w-full placeholder:text-base sm:placeholder:text-xl text-base sm:text-xl text-gray-700"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={inputRef}
        />
        <div
          onClick={onClose}
          className="cursor-pointer bg-gray-100 px-2 p-2 sm:p-3 rounded-full hover:rotate-90 hover:transition-[1s ease-in] hover:text-red-700"
        >
          <CloseIcon
            className="w-full hover:text-red-700"
            fontSize={isSmallScreen ? "small" : "large"}
            sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;
