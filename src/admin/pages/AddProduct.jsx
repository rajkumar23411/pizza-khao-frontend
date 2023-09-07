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
    const { loading, success, error } = useSelector(
        (state) => state.newProduct
    );
    const nevigate = useNavigate();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageData, setImageData] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        regularPrice: "",
        mediumPrice: "",
        largePrice: "",
        extraLargePrice: "",
        discount: 0,
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
    const handleFormValueChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "discount") {
            setFormData((prev) => ({ ...prev, [name]: Number(value) }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);
    const productImageChange = (e) => {
        const fileInput = e.target;

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            setImageName(fileInput.files[0].name);
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
    const uploadImage = async () => {
        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dkukx5byz/image/upload",
                {
                    method: "POST",
                    body: imageData,
                }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            toaster.error(error.message);
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = await uploadImage();
        await dispatch(
            createProduct(
                formData.name,
                formData.regularPrice,
                formData.mediumPrice,
                formData.largePrice,
                formData.extraLargePrice,
                category,
                formData.description,
                imageUrl
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
            dispatch({ type: NEW_PRODUCT_RESET });
            nevigate("/admin/dashboard/products");
        }
    }, [dispatch, error, success, nevigate]);
    return (
        <section className="flex">
            <DashboardNavBar />
            <div className="flex-1 bg-slate-50">
                <PageHeader pagetitle={["Product", "New"]} />
                <div className="flex items-center justify-center h-[90vh] w-full gap-10">
                    <form
                        className="w-[45%] flex flex-col gap-4 bg-white p-10 rounded-lg"
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
                        <div className="flex gap-2">
                            <select
                                className="border border-gray-500 rounded font-roboto text-gray-800 h-12 bg-transparent w-full"
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
                            <select
                                onChange={handleFormValueChange}
                                value={formData.discount}
                                name="discount"
                                className="h-12 border-2 cursor-pointer focus:border-blue-400 border-gray-400 rounded-md font-roboto text-gray-600 w-full"
                            >
                                <option
                                    defaultValue={""}
                                    className="font-roboto text-gray-600"
                                >
                                    Select discount
                                </option>
                                {[...Array(66).keys()].map((_, num) => (
                                    <option
                                        className="text-gray-600"
                                        key={num}
                                        value={num + 5}
                                    >
                                        {num + 5}%
                                    </option>
                                ))}
                            </select>
                        </div>
                        {category.length > 0 && (
                            <div className="grid grid-cols-6 w-full gap-4 py-2">
                                {category?.map((cat, indx) => (
                                    <div key={indx} className="relative w-max">
                                        <span className="text-gray-600 bg-gray-300 font-roboto px-2 py-1 text-sm rounded p">
                                            {cat}
                                        </span>
                                        <span
                                            className="far fa-times absolute -top-2 -right-1 text-red-600 cursor-pointer"
                                            onClick={() =>
                                                handleRemoveCategory(indx)
                                            }
                                        ></span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleFormValueChange(e)}
                            rows="4"
                            className="h-full resize-none border bg-transparent border-gray-500 placeholder:text-gray-500 pl-2 rounded font-roboto"
                            placeholder="Description*"
                        />
                        <div className="flex items-center justify-between gap-6">
                            {image && (
                                <div className="text-center">
                                    <div className="h-24 w-40 bg-white">
                                        <img
                                            src={image}
                                            alt={image}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <span className="text-sm">{imageName}</span>
                                </div>
                            )}
                            <div className="relative h-12 w-full ">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    className="hidden h-full w-full"
                                    onChange={productImageChange}
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="absolute h-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center w-full font-roboto rounded cursor-pointer text-white"
                                >
                                    <i className="fal fa-image text-2xl text-white"></i>
                                    &nbsp;&nbsp;&nbsp; Choose an image
                                </label>
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className={`h-12 w-full text-white ${
                                loading
                                    ? "bg-red-500 cursor-not-allowed"
                                    : "bg-red-600 cursor-pointer hover:bg-red-700 hover:shadow-inner shadow-red-800"
                            } rounded uppercase tracking-wider`}
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddProduct;
