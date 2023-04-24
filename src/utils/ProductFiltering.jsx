import React, { useState } from "react";

export const ProductFiltering = (products, selectCategory, productsCount) => {
  const [currentPage, setCurrentPageNo] = useState(1);
  const resultPerPage = 8;
  const totalPages = Math.ceil(productsCount / resultPerPage);
  const startIndex = (currentPage - 1) * resultPerPage;
  const endIndex = startIndex + resultPerPage;
  const filteredProducts = selectCategory
    ? products?.filter((product) => product.category.includes(selectCategory))
    : products;
  const displayProducts = filteredProducts.slice(startIndex, endIndex);
  const totalProducts = filteredProducts.length;
  const handlePageChange = (e, page) => {
    setCurrentPageNo(page);
  };
  return {
    handlePageChange,
    totalProducts,
    displayProducts,
    totalPages,
    currentPage,
    resultPerPage,
    setCurrentPageNo,
    filteredProducts,
  };
};
