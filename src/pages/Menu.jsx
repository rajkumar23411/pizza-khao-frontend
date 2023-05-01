import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import MenuPizzaCard from "../components/MenuPizzaCard";
import Slider from "@mui/material/Slider";
import HomeFooter from "../components/HomeFooter";
import { Categories, sortingOptions } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Pagination } from "@mui/material";
import PlaceHolderCard from "../components/PlaceHolderCard";
import NoResultFound from "../components/NoResultFound";
import SmallSearchBar from "../components/SmallSearchBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PageHead from "../components/PageHead";
import { ProductFiltering } from "../utils/ProductFiltering";

const Menu = () => {
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );
  const [selectCategory, setSelectCategory] = useState("");
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 1000]);
  const [sort, setSort] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handlePriceChange = (newValue) => {
    setPrice(newValue);
  };
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

  useEffect(() => {
    dispatch(getAllProducts(keyword, price));
  }, [dispatch, keyword, price]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectCategory(category);
    setCurrentPageNo(1);
  };

  const sortProducts = () => {
    const sortedProducts = [...filteredProducts];

    if (sort === "Price Low to High") {
      sortedProducts.sort((a, b) => a.prices.regular - b.prices.regular);
    } else if (sort === "") {
      sortedProducts.sort((a, b) => a._id.localeCompare(b._id));
    } else if (sort === "Price High to Low") {
      sortedProducts.sort((a, b) => b.prices.regular - a.prices.regular);
    } else if (sort === "Name A to Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Name Z to A") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "Newest first") {
      sortedProducts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (sort === "Oldest first") {
      sortedProducts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (sort === "Average Rating") {
      sortedProducts.sort((a, b) => b.ratings - a.ratings);
    }

    dispatch({ type: "ALL_PRODUCT_RESET", payload: sortedProducts });
  };

  useEffect(() => {
    sortProducts();
  }, [keyword, price, sort]);

  return (
    <>
      <div>
        <MainNav />
      </div>
      <PageHead pageName={"Menu"} />
      <section className="flex lg:m-20 md:m-0">
        <div className="flex-[0.2] md:m-10 lg:m-0">
          <div className="flex flex-col border-b-2 border-golden border-dashed pb-10">
            <h1 className="uppercase text-golden text-lg font-normal tracking-wider">
              Products
            </h1>
            <div className="flex flex-col gap-4 pt-4">
              {filteredProducts
                .slice(products.length - 3, products.lastIndex)
                .map((product, i) => (
                  <Link
                    to={`/pizza/${product._id}`}
                    className="flex gap-2"
                    key={i}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex justify-center flex-col">
                      <p className="uppercase text-gray-600 font-medium tracking-wider text-sm">
                        {product.name}
                      </p>
                      <p className="flex gap-2">
                        <span className="text-red-700 font-extrabold">
                          ₹{product.prices.regular} - ₹{product.prices.large}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="py-10 border-b-2 border-golden border-dashed">
            <h1 className="uppercase text-golden text-lg font-normal tracking-wider">
              Product Categories
            </h1>
            <div className="flex flex-col gap-1 pt-4">
              {Categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col border-b-2 border-golden border-dashed py-10">
            <h1 className="uppercase text-golden text-lg font-normal tracking-wider">
              Filter by price
            </h1>
            <div className="pt-4">
              <Slider
                getAriaLabel={() => "Temperature range"}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={() => "Price range slider"}
                size="small"
                sx={{ color: "brown" }}
                value={price}
                min={0}
                max={1000}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="uppercase font-normal text-golden">Price:</span>
              <span className="text-red-700 font-bold">
                ₹{price[0]} - ₹{price[1]}
              </span>
            </div>
          </div>
          <div className="flex flex-col py-10">
            <h1 className="uppercase text-golden text-lg font-normal tracking-wider">
              Search
            </h1>
            <SmallSearchBar products={products} />
          </div>
        </div>
        {loading ? (
          <div className="flex-1 md:my-10 lg:m-0">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-6 md:gap-4 place-items-center place-content-start h-full">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <PlaceHolderCard key={i} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:my-10 lg:m-0">
            <div className="flex w-full justify-between px-10">
              <div className="bg-gray-100 w-56 flex items-center justify-between h-12 rounded-sm overflow-hidden">
                <select
                  className="bg-transparent appearance-none w-full text-gray-600 h-full cursor-pointer px-2 capitalize"
                  onChange={handleSortChange}
                  onClick={() => setIsClicked(!isClicked)}
                >
                  <option value="">Sort Items</option>
                  {sortingOptions.map((option, index) => (
                    <option key={index} value={option} className="capitalize">
                      {option}
                    </option>
                  ))}
                </select>
                <div className={isClicked ? null : "-rotate-180"}>
                  <ExpandMoreIcon fontSize="small" sx={{ color: "gray" }} />
                </div>
              </div>
              <div className="text-gray-500">
                Showing 1-{filteredProducts.length} out of {productsCount}{" "}
                result
              </div>
            </div>

            {products && products.length === 0 ? (
              <NoResultFound />
            ) : (
              <>
                {displayProducts && <MenuPizzaCard pizza={displayProducts} />}

                {totalProducts > resultPerPage && (
                  <div className="grid place-items-center text-red-600 font-medium">
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
              </>
            )}
          </div>
        )}
      </section>
      <HomeFooter />
    </>
  );
};

export default Menu;
