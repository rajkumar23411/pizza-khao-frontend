import React, { useCallback, useEffect, useState } from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import PageHeader from "./PageHeader";
import ProductFormData from "./ProductFormData";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import NoResultFound from "./NoResultsFound";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdmin } from "./../../redux/actions/productAction";
import { Link } from "react-router-dom";

const DashBoardProductDetails = () => {
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (keyword) => {
    setSkip(0);
    setKeyword(keyword);
    dispatch(getAllProductsAdmin(keyword, skip));
  };

  const handleLoadMore = () => {
    setSkip(skip + 4);
    dispatch(getAllProductsAdmin(keyword, skip));
  };

  useEffect(() => {
    if (products) {
      setData((prevData) => {
        const newData = [...prevData];
        products.forEach((product) => {
          if (!newData.some((data) => data._id === product._id)) {
            newData.push(product);
          }
        });
        return newData;
      });
    }
  }, [products]);

  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  return (
    <section className="flex-1 bg-slate-100 flex flex-col">
      <PageHeader pagetitle={"Products"} />
      <section className="p-4 flex flex-col gap-5">
        <DashboardSectionHeader title={"Product List"} />
        <section className="flex items-center justify-between">
          <Link
            to="/admin/dashboard/product/add"
            className="flex items-center gap-1 h-10 font-roboto flex-1"
          >
            <span className="h-full uppercase bg-red-600 text-white rounded-lg flex items-center justify-center px-4 font-normal drop-shadow-lg">
              Add New Product
            </span>
            <span className="h-full bg-white flex items-center justify-center px-3 rounded-lg shadow-md shadow-slate-200">
              <i className="fal fa-plus text-xl text-gray-700"></i>
            </span>
          </Link>
          <div className="text-gray-600 text-sm flex-1 text-center">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="flex-1 flex items-center justify-end">
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>
        <section>
          <div className="flex">
            <span className="flex-[0.5] text-center">Image</span>
            <span className="flex-1 text-center">Product Name</span>
            <span className="flex-1 text-center">Price</span>
            <span className="flex-1 text-center">Category</span>
            <span className="flex-1 text-center">Action</span>
          </div>
          {products?.length === 0 ? (
            <NoResultFound />
          ) : (
            data?.map((product) => (
              <ProductFormData key={product._id} product={product} />
            ))
          )}
          {productsCount > data?.length && (
            <div className="flex items-center justify-center w-full mt-4">
              <button
                onClick={handleLoadMore}
                className="border-2 border-red-500 text-red-600 uppercase px-4 py-1 rounded-2xl hover:bg-red-500 hover:text-white transition-all drop-shadow-md"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default DashBoardProductDetails;
