import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClose }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/menu/${keyword}`);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white z-20">
      <form
        action="#"
        className="w-full h-20 flex items-center justify-center px-10 gap-4"
        onSubmit={searchHandler}
      >
        <button type="submit">
        <SearchIcon
          className="w-full"
          fontSize="large"
          sx={{ color: "rgba(0,0,0,0.6)" }}
        />
        </button>
        <input
          type="text"
          placeholder="Search something here..."
          className="h-full w-full placeholder:text-xl text-xl text-gray-700"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div
          onClick={onClose}
          className="cursor-pointer bg-gray-100 p-3 rounded-full hover:rotate-90 hover:transition-[1s ease-in] hover:text-red-700"
        >
          <CloseIcon
            className="w-full hover:text-red-700"
            fontSize="large"
            sx={{ color: "rgba(0,0,0,0.6)", cursor: "pointer" }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
