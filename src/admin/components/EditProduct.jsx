import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardNavBar from "./DashboardNavBar";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductDetails,
    updateProduct,
} from "../../redux/actions/productAction";
import PageHeader from "./PageHeader";
import { Categories } from "../../utils";
import toaster from "react-hot-toast";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstant";
const FormDiv = ({ children }) => {
    return <div className={`flex flex-col w-full gap-1`}>{children}</div>;
};
const FormLebel = ({ children }) => {
    return <label className="text-sm text-gray-800">{children}</label>;
};
const FormInput = ({ type, name, placeholder, value, formValueChange }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={formValueChange}
            className="h-12 border-2 w-full border-gray-400 bg-transparent rounded-lg px-1 focus:border-blue-300 font-roboto"
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
    const [newImageData, setNewImageData] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);
    const isImageChange = useCallback(() => {
        if (image) return true;
        else return false;
    }, [image]);

    const [formData, setFormData] = useState({
        name: product?.name,
        regularPrice: product?.prices?.regular,
        mediumPrice: product?.prices?.medium,
        largePrice: product?.prices?.large,
        extraLargePrice: product?.prices?.extralarge,
        discount: Number(product?.discount),
        description: product?.description,
        category: category || [],
        image: product?.image,
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
    const productImageChange = (e) => {
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            const data = new FormData();
            data.append("file", fileInput.files[0]);
            data.append("upload_preset", "sbxnht5g");
            data.append("cloud_name", "dkukx5byz");
            setNewImageData(data);
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
                    body: newImageData,
                }
            );
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            toaster.error("Something went wrong");
            console.log(error);
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        try {
            if (isImageChange()) {
                const imageUrl = await uploadImage();
                await setFormData({ ...formData, image: imageUrl });
                await dispatch(updateProduct(id, formData));
            } else {
                dispatch(updateProduct(id, formData));
            }
        } catch (error) {
            toaster.error(error.message);
        } finally {
            setUpdateLoading(false);
        }
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
        <section className="flex">
            <DashboardNavBar />
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
                                >
                                    <FormDiv>
                                        <FormLebel>Name</FormLebel>
                                        <FormInput
                                            type="text"
                                            name="name"
                                            placeholder="Name"
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
                                                placeholder="Regular size price"
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
                                                placeholder="Medium size price"
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
                                                placeholder="Large size price"
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
                                                placeholder="Extra Large size price"
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
                                                className="h-12 border-2 cursor-pointer focus:border-blue-400 border-gray-400 rounded-md font-roboto text-gray-600"
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
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={handleFormValueChange}
                                            className="h-20 resize-none border-2 rounded-lg border-gray-400 bg-transparent px-1 focus:border-blue-300 font-roboto"
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
                                </form>
                                <div className="flex items-start flex-col gap-2">
                                    <FormLebel>Image</FormLebel>
                                    <div className="w-[20rem] h-[20rem] flex items-center justify-center">
                                        <img
                                            src={image ? image : product?.image}
                                            alt={product?.name}
                                        />
                                    </div>
                                    <div className="relative h-12 w-full mt-2">
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            className="hidden h-full w-full"
                                            onChange={productImageChange}
                                        />
                                        <label
                                            htmlFor="fileInput"
                                            className="absolute h-full bg-blue-500 flex items-center justify-center w-full font-sans rounded-lg cursor-pointer text-white hover:bg-blue-600"
                                        >
                                            <i className="fal fa-image text-2xl text-white"></i>
                                            &nbsp;&nbsp;Choose an image
                                        </label>
                                    </div>
                                    <button
                                        disabled={updateLoading}
                                        onClick={handleFormSubmit}
                                        className={`h-12 ${
                                            updateLoading
                                                ? "bg-red-500 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700 cursor-pointer"
                                        }  text-white w-full uppercase tracking-wider rounded-lg  `}
                                    >
                                        {updateLoading
                                            ? "Updating..."
                                            : "Update"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProduct;
