import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductDetails,
    updateProduct,
} from "../../redux/actions/productAction";
import PageHeader from "./PageHeader";
import { Categories } from "../../utils";
import toaster from "react-hot-toast";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstant";
import { useDropzone } from "react-dropzone";

const FormDiv = ({ children }) => {
    return <div className={`flex flex-col w-full gap-1`}>{children}</div>;
};
const FormLebel = ({ children }) => {
    return (
        <label className="text-xs text-gray-600 font-medium font-sans">
            {children}
        </label>
    );
};
const FormInput = ({ type, name, value, formValueChange }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={formValueChange}
            className="h-10 border w-full border-gray-400 bg-transparent rounded-md px-1 focus:border-blue-300 font-roboto"
        />
    );
};
const EditProduct = () => {
    const id = useLocation().search.split("=")[1];
    const { loading, product } = useSelector((state) => state.productDetails);
    const { isUpdated, message, error } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggleAddCategory, setToggleAddCategory] = useState(false);
    const [category, setCategory] = useState(product?.category || []);
    const [image, setImage] = useState("");

    const [formData, setFormData] = useState({
        name: product?.name,
        regularPrice: product?.prices?.regular,
        mediumPrice: product?.prices?.medium,
        largePrice: product?.prices?.large,
        extraLargePrice: product?.prices?.extralarge,
        discount: Number(product?.discount) || 0,
        description: product?.description,
        category: category || [],
    });
    const handleFormValueChange = (e) => {
        const { name, value } = e.target;
        if (name === "discount") {
            setFormData({ ...formData, [name]: Number(value) });
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleCategorySelect = (e) => {
        const newCategory = e.target.value;
        if (!product?.category?.includes(newCategory)) {
            const updatedCategory = [...category, newCategory];
            setCategory(updatedCategory);
            setFormData({ ...formData, category: updatedCategory });
        }
    };
    const handleRemoveCategory = (index) => {
        const newCategory = category.filter((cat, indx) => indx !== index);
        setCategory(newCategory);
        setFormData({ ...formData, category: newCategory });
    };
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
    // const productImageChange = (e) => {
    //     const fileInput = e.target;
    //     if (fileInput.files && fileInput.files[0]) {
    //         const reader = new FileReader();
    //         const data = new FormData();
    //         data.append("file", fileInput.files[0]);
    //         data.append("upload_preset", "sbxnht5g");
    //         data.append("cloud_name", "dkukx5byz");
    //         setNewImageData(data);
    //         reader.onload = (e) => {
    //             setImage(e.target.result);
    //         };
    //         reader.readAsDataURL(fileInput.files[0]);
    //     }
    // };
    // const uploadImage = async () => {
    //     try {
    //         const response = await fetch(
    //             "https://api.cloudinary.com/v1_1/dkukx5byz/image/upload",
    //             {
    //                 method: "POST",
    //                 body: newImageData,
    //             }
    //         );
    //         const data = await response.json();
    //         return data.secure_url;
    //     } catch (error) {
    //         toaster.error("Something went wrong");
    //         console.log(error);
    //     }
    // };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateProduct(id, formData));
    };

    useEffect(() => {
        if (isUpdated) {
            toaster.success(message);
            dispatch({ type: UPDATE_PRODUCT_RESET });
            navigate("/admin/dashboard/products");
        }
        if (error) {
            toaster.error(error);
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [isUpdated, error, dispatch, message, navigate]);
    useEffect(() => {
        try {
            dispatch(getProductDetails(id));
        } catch (err) {
            toaster.error(err.message);
        }
    }, [id, dispatch]);
    return (
        <section className="w-full">
            <div className="flex-1 bg-slate-50">
                <PageHeader
                    pagetitle={["Product", "Edit", `${product?.name}`]}
                />
                <div className="min-h-[90vh] flex items-center justify-center">
                    <div className="flex gap-10 bg-white p-10 rounded-lg shadow">
                        {loading ? (
                            <span>Hang on loading ....</span>
                        ) : (
                            <>
                                <form
                                    className="flex flex-col w-[28rem] gap-4"
                                    onSubmit={handleFormSubmit}
                                    encType="multipart/form-data"
                                >
                                    <div {...getRootProps()}>
                                        <input
                                            {...getInputProps()}
                                            className="cursor-pointer w-full"
                                        />
                                        <div className="cursor-pointer flex flex-col items-center justify-center gap-2">
                                            <img
                                                src={
                                                    image
                                                        ? image
                                                        : product?.image ||
                                                          "https://placehold.co/150x150"
                                                }
                                                alt="pizza"
                                                className="h-32 w-32 rounded-full object-cover object-center"
                                            />
                                            <p className="font-sans text-purple-600 text-sm font-medium">
                                                Change profile photo
                                            </p>
                                        </div>
                                    </div>
                                    <FormDiv>
                                        <FormLebel>Name</FormLebel>
                                        <FormInput
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            formValueChange={
                                                handleFormValueChange
                                            }
                                        />
                                    </FormDiv>
                                    <div className="flex gap-4">
                                        <FormDiv>
                                            <FormLebel>
                                                Regular size price
                                            </FormLebel>
                                            <FormInput
                                                type="text"
                                                name="regularPrice"
                                                value={formData.regularPrice}
                                                formValueChange={
                                                    handleFormValueChange
                                                }
                                            />
                                        </FormDiv>
                                        <FormDiv>
                                            <FormLebel>
                                                Medium size price
                                            </FormLebel>
                                            <FormInput
                                                type="text"
                                                name="mediumPrice"
                                                value={formData.mediumPrice}
                                                formValueChange={
                                                    handleFormValueChange
                                                }
                                            />
                                        </FormDiv>
                                        <FormDiv>
                                            <FormLebel>
                                                Large size price
                                            </FormLebel>
                                            <FormInput
                                                type="text"
                                                name="largePrice"
                                                value={formData.largePrice}
                                                formValueChange={
                                                    handleFormValueChange
                                                }
                                            />
                                        </FormDiv>
                                    </div>
                                    <div className="flex gap-4">
                                        <FormDiv>
                                            <FormLebel>
                                                Extra Large size price
                                            </FormLebel>
                                            <FormInput
                                                type="text"
                                                name="extraLargePrice"
                                                value={formData.extraLargePrice}
                                                formValueChange={
                                                    handleFormValueChange
                                                }
                                            />
                                        </FormDiv>
                                        <FormDiv>
                                            <FormLebel>Discount</FormLebel>
                                            <select
                                                onChange={handleFormValueChange}
                                                value={formData.discount}
                                                name="discount"
                                                className="h-10 border cursor-pointer focus:border-blue-400 border-gray-400 rounded-md font-roboto text-gray-600"
                                            >
                                                <option
                                                    defaultValue={
                                                        formData.discount
                                                    }
                                                    className="font-roboto text-gray-600"
                                                >
                                                    Select discount
                                                </option>
                                                {[...Array(66).keys()].map(
                                                    (_, num) => (
                                                        <option
                                                            className="text-gray-600"
                                                            key={num}
                                                            value={num + 5}
                                                        >
                                                            {num + 5}%
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </FormDiv>
                                    </div>
                                    <FormDiv>
                                        <FormLebel>Description</FormLebel>
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleFormValueChange}
                                            className="h-20 resize-none border rounded-lg border-gray-400 bg-transparent px-1 focus:border-blue-300 font-roboto text-sm"
                                        />
                                    </FormDiv>
                                    <FormDiv>
                                        <div className="flex items-center justify-between">
                                            <FormLebel>
                                                {toggleAddCategory
                                                    ? "Add category"
                                                    : "Categories"}
                                            </FormLebel>
                                            <div
                                                onClick={() =>
                                                    setToggleAddCategory(
                                                        !toggleAddCategory
                                                    )
                                                }
                                            >
                                                {toggleAddCategory ? (
                                                    <i className="fas fa-times-circle text-red-700 cursor-pointer"></i>
                                                ) : (
                                                    <span className="text-xs text-blue-700 cursor-pointer uppercase font-semibold">
                                                        Edit category
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {toggleAddCategory && (
                                            <select
                                                name="updatedCategory"
                                                className="border-2 h-12 border-gray-400 rounded-lg"
                                                value={category}
                                                onChange={handleCategorySelect}
                                            >
                                                <option
                                                    defaultValue
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
                                        )}
                                        {toggleAddCategory ? (
                                            <div className="grid grid-cols-6 w-full gap-4 mt-2">
                                                {category.length > 0 &&
                                                    category.map(
                                                        (cat, indx) => (
                                                            <div
                                                                key={indx}
                                                                className="relative w-max"
                                                            >
                                                                <span className="text-gray-600 bg-gray-300 font-roboto px-2 py-1 text-sm rounded">
                                                                    {cat}
                                                                </span>
                                                                <span
                                                                    className="far fa-times absolute -top-2 -right-1 text-red-700 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleRemoveCategory(
                                                                            indx
                                                                        )
                                                                    }
                                                                ></span>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-6 w-full gap-4">
                                                {category?.map((cat) => (
                                                    <span
                                                        key={cat}
                                                        className="bg-gray-300 flex items-center justify-center font-sans text-sm p-1 rounded-md"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </FormDiv>
                                    <button
                                        type="submit"
                                        className="h-12 bg-red-600 text-white font-medium font-sans rounded-md hover:bg-red-700 cursor-pointer"
                                    >
                                        Update product
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProduct;
