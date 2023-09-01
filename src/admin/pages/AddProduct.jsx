import React, { useCallback, useEffect, useState } from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import PageHeader from "../components/PageHeader";
import { Categories } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, createProduct } from "../../redux/actions/productAction";
import toaster from "react-hot-toast";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstant";
const Input = ({ name, type, placeholder, value, handleFormValueChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value[name]}
      onChange={(e) => handleFormValueChange(e)}
      className="border border-gray-500 rounded h-12 w-full bg-transparent pl-2 font-roboto placeholder:text-gray-500  focus:border-blue-600 focus:shadow focus:shadow-blue-400"
    />
  );
};
const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newProduct);
  const nevigate = useNavigate();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    regularPrice: "",
    mediumPrice: "",
    largePrice: "",
    extraLargePrice: "",
  });

  const handleCategorySelect = (e) => {
    const newCategory = e.target.value;
    if (!category.includes(newCategory))
      setCategory([...category, newCategory]);
  };
  const handleRemoveCategory = (index) => {
    const newCategory = category.filter((cat, indx) => indx !== index);
    setCategory(newCategory);
  };
  const productImageChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      const data = new FormData();
      data.append("file", fileInput.files[0]);
      data.append("upload_preset", "sbxnht5g");
      data.append("cloud_name", "dkukx5byz");
      setImageData(data);

      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  };
  const handleFormValueChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);
  const uploadImage = async () => {
    await fetch("https://api.cloudinary.com/v1_1/dkukx5byz/image/upload", {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageURL(data.secure_url);
      })
      .catch((error) => console.log(error));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await uploadImage();
    dispatch(
      createProduct(
        formData.name,
        formData.regularPrice,
        formData.mediumPrice,
        formData.largePrice,
        formData.extraLargePrice,
        category,
        formData.description,
        imageURL
      )
    );
  };
  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    if (success) {
      toaster.success("Item added successfully");
      nevigate("/admin/dashboard/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, nevigate]);

  return (
    <section className="flex">
      <DashboardNavBar />
      <div className="flex-1 bg-gray-100">
        <PageHeader pagetitle={["Product", "New"]} />
        <div className="flex items-center justify-center h-[90vh] w-full gap-10">
          <form
            className="w-[40%] flex flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <Input
              type={"text"}
              placeholder={"Name*"}
              name={"name"}
              value={formData}
              handleFormValueChange={handleFormValueChange}
            />
            <div className="flex gap-2">
              <Input
                type={"text"}
                placeholder={"Regular size price*"}
                name={"regularPrice"}
                value={formData}
                handleFormValueChange={handleFormValueChange}
              />
              <Input
                type={"text"}
                placeholder={"Medium size price*"}
                name={"mediumPrice"}
                value={formData}
                handleFormValueChange={handleFormValueChange}
              />
            </div>
            <div className="flex gap-2">
              <Input
                type={"text"}
                placeholder={"Large size price*"}
                name={"largePrice"}
                value={formData}
                handleFormValueChange={handleFormValueChange}
              />
              <Input
                type={"text"}
                placeholder={"Extra large size price*"}
                name={"extraLargePrice"}
                value={formData}
                handleFormValueChange={handleFormValueChange}
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleFormValueChange(e)}
              rows="4"
              className="h-full resize-none border bg-transparent border-gray-500 placeholder:text-gray-500 pl-2 rounded font-roboto"
              placeholder="Description*"
            />
            <select
              className="border border-gray-500 rounded font-roboto text-gray-800 h-12 bg-transparent"
              value={category}
              onChange={handleCategorySelect}
            >
              <option
                value=""
                defaultValue={""}
                className="font-roboto"
                disabled
              >
                Select category*
              </option>
              {Categories.map((cat, indx) => (
                <option
                  value={cat}
                  key={indx}
                  className="font-roboto text-gray-800"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-6 w-full gap-4">
              {category.length > 0 &&
                category.map((cat, indx) => (
                  <div key={indx} className="relative w-max">
                    <span className="text-gray-600 bg-gray-300 font-roboto px-2 py-1 text-sm rounded">
                      {cat}
                    </span>
                    <span
                      className="far fa-times absolute -top-2 -right-1 text-red-600 cursor-pointer"
                      onClick={() => handleRemoveCategory(indx)}
                    ></span>
                  </div>
                ))}
            </div>
            <div className="relative h-12 w-full">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden h-full w-full"
                onChange={productImageChange}
              />
              <label
                htmlFor="fileInput"
                className="absolute h-full border-2 border-blue-400 flex items-center justify-center w-full font-roboto rounded cursor-pointer text-blue-600"
              >
                <i className="fal fa-image text-2xl text-blue-600"></i>
                &nbsp;&nbsp;&nbsp; Choose an image
              </label>
            </div>
            <button className="h-12 w-full text-white bg-red-600 cursor-pointer rounded hover:bg-red-700 uppercase tracking-wider hover:shadow-inner shadow-red-800">
              add product
            </button>
          </form>
          {image && (
            <div className="h-80 w-80">
              <img
                src={image}
                alt={image}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
