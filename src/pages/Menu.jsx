import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import Slider from "@mui/material/Slider";
import HomeFooter from "../components/HomeFooter";
import { Categories, filterOptions } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import {
    Button,
    FormControlLabel,
    Pagination,
    Radio,
    RadioGroup,
    Skeleton,
} from "@mui/material";
import NoResultFound from "../components/NoResultFound";
import PageHead from "../components/PageHead";
import { getAllProducts } from "../redux/actions/productAction";
import { red } from "@mui/material/colors";
import PizzaCard from "../components/PizzaCard";
import SearchBar from "../admin/components/SearchBar";
import { ADD_TO_CART_RESET } from "../redux/constants/cartConstant";
import { addToCart, clearError } from "../redux/actions/cartActions";
import toaster from "react-hot-toast";
const Header = ({ name }) => {
    return <h1 className="uppercase text-golden p-2 text-xl">{name}</h1>;
};
const FilterDiv = ({ children }) => {
    return (
        <div className="flex flex-col gap-2 border-b-2 border-golden border-dashed py-6">
            {children}
        </div>
    );
};
const Menu = () => {
    const {
        loading,
        products,
        productsCount,
        filteredProductsCount,
        perPageProductCount,
    } = useSelector((state) => state.products);
    const {
        loading: cartLoading,
        success,
        error,
    } = useSelector((state) => state.myCart);
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);
    const [discount, setDiscount] = useState(0);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const resultPerPage = 16;

    const fetchedMoreProduct = (e) => {
        setPage(parseInt(e));
    };

    const handleSearch = (keyword) => {
        const data = keyword.trim().toLowerCase();
        setKeyword(data);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSortByChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };
    const handlePriceChange = (e, newPrice) => {
        setPrice(newPrice);
    };
    const handleClearFilter = () => {
        setSort("");
        setCategory("");
        setKeyword("");
        setDiscount(0);
    };
    const handleDiscountChange = (e) => {
        const data = parseInt(e.target.value);
        setDiscount(data);
    };
    const handleAddToCart = (id, count, size) => {
        setLoadingProductId(id);
        dispatch(addToCart(id, count, size));
    };
    useEffect(() => {
        if (success) {
            toaster.success("Item added to cart", { className: "font-roboto" });
            dispatch({ type: ADD_TO_CART_RESET });
            setLoadingProductId(null);
        }
        if (error) {
            toaster.error(error, { className: "font-roboto" });
            dispatch(clearError());
        }
    }, [success, error, dispatch]);
    useEffect(() => {
        dispatch(
            getAllProducts(
                resultPerPage,
                keyword,
                page,
                category,
                sort,
                price,
                discount
            )
        );
    }, [
        dispatch,
        resultPerPage,
        page,
        category,
        sort,
        keyword,
        price,
        discount,
    ]);

    return (
        <section>
            <MainNav />
            <PageHead pageName={"Menu"} />
            <section className="w-full h-full bg-slate-50 gap-6 flex p-10">
                <div className="h-max w-96 bg-white rounded-lg flex flex-col pb-10">
                    <div className="flex items-center justify-between p-2">
                        <h1 className="uppercase text-red-600 text-lg font-medium">
                            Filters
                        </h1>
                        <Button
                            variant="text"
                            size="small"
                            onClick={handleClearFilter}
                        >
                            Clear All
                        </Button>
                    </div>
                    <FilterDiv>
                        <Header name={"Product Categories"} />
                        <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={category}
                            onChange={handleCategoryChange}
                            className="pl-6"
                        >
                            {Categories.map((category) => (
                                <FormControlLabel
                                    control={
                                        <Radio
                                            sx={{
                                                "&.Mui-checked": {
                                                    color: red[600],
                                                },
                                                padding: "6px 8px",
                                            }}
                                            size="small"
                                        />
                                    }
                                    label={category}
                                    key={category}
                                    value={category}
                                    className="text-gray-600"
                                />
                            ))}
                        </RadioGroup>
                    </FilterDiv>
                    <FilterDiv>
                        <Header name={"Price"} />
                        <div className="px-6">
                            <Slider
                                value={price}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                getAriaLabel={() => "Price range slider"}
                                min={0}
                                max={1000}
                                size="small"
                                sx={{ color: "brown" }}
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="uppercase text-golden font-medium">
                                        Price:{" "}
                                    </span>
                                    <span className="text-red-700 font-medium">
                                        ₹{price[0]} - ₹{price[1]}
                                    </span>
                                </div>
                                <button
                                    className="uppercase text-golden"
                                    onClick={() => setPrice([0, 1000])}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </FilterDiv>
                    <FilterDiv>
                        <Header name="Discount" />
                        <RadioGroup
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={discount}
                            onChange={handleDiscountChange}
                            className="pl-6"
                        >
                            {[10, 20, 30, 40, 50, 60].map((option) => (
                                <FormControlLabel
                                    control={
                                        <Radio
                                            sx={{
                                                "&.Mui-checked": {
                                                    color: red[600],
                                                },
                                                padding: "6px 8px",
                                            }}
                                            size="small"
                                        />
                                    }
                                    label={`${option}% or above`}
                                    key={option}
                                    value={option}
                                    className="text-gray-600"
                                />
                            ))}
                        </RadioGroup>
                    </FilterDiv>
                </div>
                <div className="h-full w-full flex flex-col gap-10">
                    <div className="flex items-center justify-between">
                        <select
                            onChange={(e) => handleSortByChange(e)}
                            value={sort}
                            className="h-12 w-64 bg-white shadow font-roboto text-gray-500 text-sm cursor-pointer px-2 rounded-md focus:border focus:border-blue-300 focus:shadow-blue-400"
                        >
                            <option value={""} className="font-roboto">
                                Default Sort
                            </option>
                            {filterOptions.map((option) => (
                                <option
                                    value={option}
                                    className="text-gray-500 font-roboto"
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div className="text-gray-500 text-sm text-center font-roboto">
                            Showing {perPageProductCount} of {productsCount}{" "}
                            results
                        </div>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    {loading ? (
                        <section className="grid grid-cols-4 gap-6">
                            {Array(16)
                                .fill(null)
                                .map((_, index) => (
                                    <Skeleton
                                        sx={{
                                            bgcolor: "grey.300",
                                        }}
                                        animation="wave"
                                        key={index}
                                        variant="rectangular"
                                        width={220}
                                        height={220}
                                        className="rounded-xl "
                                    />
                                ))}
                        </section>
                    ) : !loading && filteredProductsCount === 0 ? (
                        <NoResultFound />
                    ) : (
                        <>
                            <section className="grid grid-cols-4 gap-y-10">
                                {products?.map((product) => (
                                    <PizzaCard
                                        product={product}
                                        key={product._id}
                                        primaryBtn={"ADD TO CART"}
                                        handleClick={handleAddToCart}
                                        loadingProductId={loadingProductId}
                                        cartLoading={cartLoading}
                                    />
                                ))}
                            </section>
                            {filteredProductsCount > resultPerPage && (
                                <Stack
                                    spacing={2}
                                    className="mt-5 mx-auto flex items-center justify-center"
                                >
                                    <Pagination
                                        count={parseInt(
                                            Math.ceil(
                                                filteredProductsCount /
                                                    resultPerPage
                                            )
                                        )}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={(e) =>
                                            fetchedMoreProduct(
                                                e.target.textContent
                                            )
                                        }
                                        color="primary"
                                    />
                                </Stack>
                            )}
                        </>
                    )}
                </div>
            </section>
            <HomeFooter />
        </section>
    );
};

export default Menu;
