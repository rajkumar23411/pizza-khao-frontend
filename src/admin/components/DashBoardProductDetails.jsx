import React, { useEffect, useState } from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import NoResultFound from "./NoResultsFound";
import { useDispatch, useSelector } from "react-redux";
import {
    clearError,
    deleteProduct,
    getAllProducts,
} from "./../../redux/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import {
    Button,
    FormControlLabel,
    Pagination,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Categories, filterOptions } from "../../utils";
import { red } from "@mui/material/colors";
import toaster from "react-hot-toast";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstant";
const DashBoardProductDetails = () => {
    const {
        loading,
        products,
        productsCount,
        filteredProductsCount,
        perPageProductCount,
        isDeleted,
        message,
        error,
    } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [discount, setDiscount] = useState(0);
    const resultPerPage = 15;

    const handleSearch = (keyword) => {
        const data = keyword.trim().toLowerCase();
        setKeyword(data);
        setPage(1);
    };
    const navigateTo = (id) => {
        navigate(`/admin/dashboard/product/edit?id=${id}`);
    };
    const fetchedMoreProduct = (e) => {
        setPage(e);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleSortByChange = (e) => {
        setSort(e.target.value);
    };
    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
        setPage(1);
    };
    const handleClearFilter = () => {
        setCategory("");
        setSort("");
        setDiscount(0);
        setShowFilterOptions(false);
    };
    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
    };
    useEffect(() => {
        if (isDeleted) {
            toaster.success(message);
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
        dispatch(
            getAllProducts(
                resultPerPage,
                keyword,
                page,
                category,
                sort,
                null,
                discount
            )
        );
    }, [
        dispatch,
        keyword,
        page,
        category,
        sort,
        isDeleted,
        error,
        message,
        discount,
    ]);
    return (
        <section className="flex-1 bg-slate-50 flex flex-col">
            <PageHeader pagetitle={"Products"} />
            <section className="p-4 flex flex-col gap-5 w-full">
                <DashboardSectionHeader title={"Product List"} />
                <section className="flex items-center justify-between">
                    <Link
                        to="/admin/dashboard/product/add"
                        className="flex items-center h-10 font-roboto flex-1 "
                    >
                        <div className="bg-purple-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 shadow-inner drop-shadow-md">
                            <span className="font-roboto">Add New Product</span>
                            <i className="fal fa-plus text-lg" />
                        </div>
                    </Link>
                    <div className="text-gray-500 text-sm flex-1 text-center font-roboto">
                        Showing {perPageProductCount} of {productsCount} results
                    </div>
                    <div className="flex-1 flex items-center justify-end gap-4">
                        <i
                            className="fal fa-sort-alpha-up text-2xl text-gray-600 bg-white p-2 shadow-md rounded-md cursor-pointer hover:text-red-600"
                            onClick={() => setShowFilterOptions(true)}
                        ></i>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </section>
                <section
                    className={`w-full transition-all origin-top duration-200 ease-in-out ${
                        showFilterOptions
                            ? "h-max flex flex-col gap-6 bg-white shadow-md rounded-lg relative scale-100 py-6 px-10"
                            : "h-0 scale-0"
                    }`}
                >
                    <button
                        className="fal fa-times text-2xl text-gray-500 hover:text-red-600 cursor-pointer absolute top-1 right-3"
                        onClick={() => setShowFilterOptions(false)}
                    ></button>
                    <div className="flex gap-60">
                        <div>
                            <h1 className="uppercase text-xl font-medium text-gray-700">
                                Catrogry
                            </h1>
                            <div className="flex items-center gap-4">
                                <RadioGroup
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={category}
                                    onChange={handleCategoryChange}
                                >
                                    {Categories.map((category) => (
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: red[600],
                                                        },
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
                            </div>
                        </div>
                        <div>
                            <h1 className="uppercase text-xl font-medium text-gray-700">
                                Sort By
                            </h1>
                            <RadioGroup
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={sort}
                                onChange={handleSortByChange}
                            >
                                {filterOptions.map((option) => (
                                    <FormControlLabel
                                        value={option}
                                        control={
                                            <Radio
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: red[600],
                                                    },
                                                }}
                                                size="small"
                                            />
                                        }
                                        label={option}
                                        key={option}
                                        className="text-gray-600"
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <h1>Discount</h1>
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
                        </div>
                    </div>
                    <Button
                        variant="outlined"
                        className="w-max"
                        onClick={handleClearFilter}
                    >
                        Clear filters
                    </Button>
                </section>
                {loading ? (
                    <section className="grid grid-cols-5 gap-6">
                        {Array(10)
                            .fill(null)
                            .map((_, index) => (
                                <Skeleton
                                    sx={{
                                        bgcolor: "grey.300",
                                    }}
                                    animation="wave"
                                    key={index}
                                    variant="rectangular"
                                    width={230}
                                    height={230}
                                    className="rounded-xl "
                                />
                            ))}
                    </section>
                ) : !loading && filteredProductsCount === 0 ? (
                    <NoResultFound />
                ) : (
                    <>
                        <section className="grid grid-cols-5 gap-6">
                            {products?.map((product) => (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-center flex-col bg-white px-4 py-2 rounded-xl drop-shadow-sm"
                                >
                                    <div className="h-40 w-40">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="uppercase font-medium text-golden">
                                        {product.name}
                                    </div>
                                    <div>
                                        ₹{product.prices.regular} - ₹
                                        {product.prices.extralarge}
                                    </div>
                                    <div className="w-full flex items-center justify-between pt-2 px-2">
                                        <button
                                            onClick={() =>
                                                navigateTo(product._id)
                                            }
                                            className="border-2 border-blue-600 text-blue-600 px-3 py-1 uppercase rounded hover:bg-blue-600 hover:text-white text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteProduct(product._id)
                                            }
                                            className="border-2 border-red-600 text-red-600 px-3 py-1 uppercase rounded hover:bg-red-600 hover:text-white text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </section>
                        {filteredProductsCount > resultPerPage &&
                            products &&
                            productsCount && (
                                <Stack
                                    spacing={2}
                                    className="flex justify-center mt-5 mx-auto"
                                >
                                    <Pagination
                                        count={Math.ceil(
                                            productsCount / resultPerPage
                                        )}
                                        variant="outlined"
                                        shape="circular"
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
            </section>
        </section>
    );
};

export default DashBoardProductDetails;
