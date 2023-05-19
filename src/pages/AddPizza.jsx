import toaster from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, createProduct } from "../redux/actions/productAction";
import { NEW_PRODUCT_RESET } from "../redux/constants/productConstant";
import { Categories } from "../utils";

const AddPizza = () => {
  const [name, setName] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [extraLargePrice, setExtraLargePrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newProduct);
  const nevigate = useNavigate();
  const handleCategoryChange = (e) => {
    const selectedcategory = e.target.value;
    if (!category.includes(selectedcategory)) {
      setCategory((preValues) => [...preValues, selectedcategory]);
    }
  };

  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    if (success) {
      toaster.success("Item added successfully");
      nevigate("/");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, toaster, nevigate]);

  const productImageChnage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sbxnht5g");
    data.append("cloud_name", "dkukx5byz");
    await fetch("https://api.cloudinary.com/v1_1/dkukx5byz/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setImage(data.secure_url))
      .catch((error) => console.log(error));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createProduct(
        name,
        regularPrice,
        mediumPrice,
        largePrice,
        extraLargePrice,
        category,
        description,
        image
      )
    );
  };
  return (
    <div className="bg-slate-50 h-screen w-screen flex items-center justify-center">
      <form
        encType="multipart/form-data"
        onSubmit={handleProductSubmit}
        className="bg-white shadow-md flex flex-col gap-2 p-10"
      >
        <div className="flex flex-col gap-1 w-[26rem]">
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            placeholder="Pizza name here*"
            className="w-full h-full border-[1px] rounded border-gray-300 py-3 pl-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-[26rem] flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="price" className="text-sm text-gray-600">
              Regular size Price
            </label>
            <input
              type="text"
              placeholder="Offer price here*"
              className="w-full h-full border-[1px] rounded border-gray-300 py-3 pl-2"
              onChange={(e) => setRegularPrice(e.target.value)}
              value={regularPrice}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="price" className="text-sm text-gray-600">
              Medium size Price
            </label>
            <input
              type="text"
              placeholder="Offer price here*"
              className="w-full h-full border-[1px] rounded border-gray-300 py-3 pl-2"
              onChange={(e) => setMediumPrice(e.target.value)}
              value={mediumPrice}
            />
          </div>
        </div>
        <div className="w-[26rem] flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="price" className="text-sm text-gray-600">
              Large size Price
            </label>
            <input
              type="text"
              placeholder="Offer price here*"
              className="w-full h-full border-[1px] rounded border-gray-300 py-3 pl-2"
              onChange={(e) => setLargePrice(e.target.value)}
              value={largePrice}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="price" className="text-sm text-gray-600">
              Extralarge size Price
            </label>
            <input
              type="text"
              placeholder="Offer price here*"
              className="w-full h-full border-[1px] rounded border-gray-300 py-3 pl-2"
              onChange={(e) => setExtraLargePrice(e.target.value)}
              value={extraLargePrice}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[26rem]">
          <label htmlFor="description" className="text-sm text-gray-600">
            Description
          </label>
          <textarea
            cols="30"
            rows="3"
            placeholder="Pizza description here*"
            className="w-full h-full border-[1px] border-gray-300 py-3 pl-2 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col gap-1 w-[26rem]">
          <label htmlFor="category" className="text-sm text-gray-600">
            Select Categories:
          </label>
          <select
            className="w-full h-full border-[1px] border-gray-300 py-3 pl-2 rounded"
            value={category}
            onChange={handleCategoryChange}
          >
            <option defaultValue>select categories</option>
            {Categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {category && (
            <div className="grid grid-cols-5 gap-2">
              {category.map((cat, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-2 py-1 rounded text-sm text-gray-600 place-items-center"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="w-[26rem]">
          <label
            htmlFor="formFileMultiple"
            className="mb-2 inline-block text-neutral-700"
          >
            Choose an image
          </label>
          <input
            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            type="file"
            id="formFileMultiple"
            multiple
            onChange={productImageChnage}
          />
        </div>
        {image && <img src={image} alt="pizza" className="h-16 w-16" />}
        {loading ? (
          <button
            type="button"
            class="bg-red-500 text-white py-2 rounded-sm uppercase flex items-center justify-center gap-2"
            disabled
          >
            <i className="fas fa-spinner fa-spin text-xl"></i>
            Adding...
          </button>
        ) : (
          <input
            type="submit"
            value="Add Product"
            className="py-2 bg-red-600 text-white rounded uppercase font-semibold cursor-pointer tracking-wider hover:bg-red-700"
          />
        )}
      </form>
    </div>
  );
};

export default AddPizza;
