import React from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState("");

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-80">
      <input
        type="text"
        placeholder="Search here...."
        className="w-full h-12 border-2 border-transparent focus:border-sky-200 pl-2 pr-8 drop-shadow rounded font-roboto tracking-tight placeholder:text-gray-400"
        value={keyword}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="fal fa-search absolute right-2 top-3 text-xl text-gray-500"
      ></button>
    </form>
  );
};

export default SearchBar;
