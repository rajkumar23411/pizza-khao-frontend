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
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import PlaceHolderCard from "../components/PlaceHolderCard";
import NoResultFound from "../components/NoResultFound";
import SmallSearchBar from "../components/SmallSearchBar";
import PageHead from "../components/PageHead";

const SearchMenu = () => {
  const { loading, products, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 1000]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const setCurrentPageNo = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllProducts(keyword, category, price, currentPage));
  }, [dispatch, keyword, category, price, currentPage]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const totalPages = Math.ceil(productsCount / resultPerPage);

  const sortProducts = () => {
    const sortedProducts = [...products];

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
  }, [keyword, category, price, sort]);

  return (
    <>
      <div>
        <MainNav />
      </div>
      <PageHead pageName={"Menu"} />
      {products && products.length === 0 ? (
        <NoResultFound />
      ) : (
        <>
          <section className="flex m-20">
            <div className="flex-[0.2]">
              <div className="flex flex-col border-b-2 border-golden border-dashed pb-10">
                <h1 className="uppercase text-golden text-lg font-roboto font-semibold tracking-wider">
                  Products
                </h1>
                <div className="flex flex-col gap-4 pt-4">
                  {products
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
                          className="h-16"
                        />
                        <div className="flex justify-center flex-col">
                          <p className="uppercase text-gray-700 font-semibold font-roboto tracking-wider text-sm">
                            {product.name}
                          </p>
                          <p className="flex gap-2">
                            <span className="text-red-700 font-extrabold">
                              ₹{product.prices.regular} - ₹
                              {product.prices.large}
                            </span>
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="py-10 border-b-2 border-golden border-dashed">
                <h1 className="uppercase text-golden text-lg font-roboto font-semibold tracking-wider">
                  Product Categories
                </h1>
                <div className="flex flex-col gap-1 pt-4">
                  {Categories.map((cat, i) => (
                    <span
                      key={i}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => setCategory(products && cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col border-b-2 border-golden border-dashed py-10">
                <h1 className="uppercase text-golden text-lg font-roboto font-semibold tracking-wider">
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
                  <span className="uppercase font-bold text-golden">
                    Price:
                  </span>
                  <span className="text-red-700 font-bold">
                    ₹{price[0]} - ₹{price[1]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col py-10">
                <h1 className="uppercase text-golden text-lg font-roboto font-semibold tracking-wider">
                  Search
                </h1>
                <SmallSearchBar products={products} />
              </div>
            </div>
            {loading ? (
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-6 place-items-center place-content-start h-full">
                  {Array(8)
                    .fill(null)
                    .map((_, i) => (
                      <PlaceHolderCard key={i} />
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex w-full justify-between px-10">
                  <FormControl sx={{ minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-label">
                      Sort items
                    </InputLabel>
                    <Select
                      value={sort}
                      label="Sort items"
                      onChange={handleSortChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {sortingOptions.map((option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="text-gray-500">
                    Showing 1-{resultPerPage} out of {productsCount} result
                  </div>
                </div>
                {products && <MenuPizzaCard pizza={products} />}

                {resultPerPage < productsCount && (
                  <div className="grid place-items-center ">
                    <Stack>
                      <Pagination
                        onChange={setCurrentPageNo}
                        page={currentPage}
                        count={totalPages}
                        shape="rounded"
                        size="large"
                      />
                    </Stack>
                  </div>
                )}
              </div>
            )}
          </section>
        </>
      )}

      <HomeFooter />
    </>
  );
};

export default SearchMenu;
