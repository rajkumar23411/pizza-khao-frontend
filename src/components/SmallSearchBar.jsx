import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
const SmallSearchBar = ({ products }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  // Filter the products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu/${searchTerm}`);
    }
  };
  return (
    <div>
      <form
        className="mt-4 border-[1px] p-3 border-gray-500 flex items-center justify-between rounded"
        onSubmit={searchHandler}
      >
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <SearchIcon className="text-gray-500" />
        </button>
      </form>
      {searchTerm && (
        <div className="flex flex-col gap-2 mt-2 text-lg shadow-md p-4">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 text-sm">No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <Link
                to={`/pizza/${product._id}`}
                key={product.id}
                className="flex items-start gap-2"
              >
                <img src={product.image} alt={product.name} className="h-12" />
                <div>
                  <p className="uppercase text-gray-700 font-normal tracking-wider text-xs">
                    {product.name}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-red-700 font-extrabold text-xs">
                      ₹{product.prices.regular} - ₹{product.prices.large}
                    </span>
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SmallSearchBar;
