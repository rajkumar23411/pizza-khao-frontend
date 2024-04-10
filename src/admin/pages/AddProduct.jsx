import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Categories } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, createProduct } from "../../redux/actions/productAction";
import toaster from "react-hot-toast";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstant";
import { useDropzone } from "react-dropzone";
const Input = ({ name, type, placeholder, value, handleFormValueChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value[name]}
            onChange={(e) => handleFormValueChange(e)}
            className="border border-gray-400 rounded h-10 w-full bg-transparent pl-2 font-sans placeholder:text-gray-500  placeholder:text-sm focus:border-blue-600 focus:shadow focus:shadow-blue-400"
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
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        regularPrice: "",
        mediumPrice: "",
        largePrice: "",
        extraLargePrice: "",
        file: "",
        discount: 0,
    });

    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        setFormData((prev) => ({
            ...prev,
            file: acceptedFiles[0],
        }));
        reader.readAsDataURL(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
        },
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            createProduct(
                formData.name,
                formData.regularPrice,
                formData.mediumPrice,
                formData.largePrice,
                formData.extraLargePrice,
                category,
                formData.description,
                formData.file
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
        <div className="bg-slate-50 w-full">
            <PageHeader pagetitle={["Product", "New"]} />
            <div className="flex items-center justify-center h-[90vh] w-full gap-10">
                <form
                    className="w-[45%] flex flex-col gap-4 bg-white p-10 rounded-lg"
                    onSubmit={handleFormSubmit}
                    typeof=""
                >
                    <div
                        {...getRootProps()}
                        className="w-max m-auto text-center"
                    >
                        <input
                            {...getInputProps()}
                            className="cursor-pointer w-full"
                        />
                        <div className="cursor-pointer gap-2">
                            <img
                                src={image || "https://placehold.co/150x150"}
                                alt="pizza"
                                className="h-32 w-32 rounded-full object-cover object-center"
                            />
                            <p className="font-sans pt-2 text-purple-600 text-sm font-medium">
                                Add a product image*
                            </p>
                        </div>
                    </div>
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
                            className="border border-gray-400 rounded font-sans text-sm text-gray-800 h-10 bg-transparent w-full"
                            value={category}
                            onChange={handleCategorySelect}
                        >
                            <option
                                value=""
                                defaultValue={""}
                                className="font-roboto text-gray-700"
                                disabled
                            >
                                Select category*
                            </option>
                            {Categories.map((cat, indx) => (
                                <option
                                    value={cat}
                                    key={indx}
                                    className="font-sans text-sm text-gray-800"
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={handleFormValueChange}
                            value={formData.discount}
                            name="discount"
                            className="h-10 border cursor-pointer focus:border-blue-400 border-gray-400 rounded-md font-sans text-sm text-gray-600 w-full"
                        >
                            <option
                                defaultValue={""}
                                className="font-sans text-sm text-gray-600"
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
                        rows="3"
                        className="h-full resize-none border bg-transparent border-gray-500 placeholder:text-gray-500 pl-2 rounded font-sans text-sm"
                        placeholder="Description*"
                    />
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
    );
};

export default AddProduct;
