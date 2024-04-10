import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, clearError } from "../redux/actions/addressAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../utils";
import { FormError } from "./../_auth/forms/SignInForm";
import Spinner from "./Spinner";
import toaster from "react-hot-toast";
import { ADD_NEW_ADDRESS_RESET } from "../redux/constants/addressConstant";
const initialValues = {
    name: "",
    contact: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
    locality: "",
    landmark: "",
    alternatContact: "",
};
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Name is required")
        .min(2, "Please enter a valid name"),
    contact: Yup.string()
        .required("Contact number is required")
        .matches(phoneRegExp, "Invalid contact number"),
    pinCode: Yup.number()
        .required("Pincode is required")
        .min(6, "Invalid pincode"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City/District/Town is required"),
    state: Yup.string().required("State is required"),
    locality: Yup.string().required("Locality is required"),
    alternatContact: Yup.string().matches(
        phoneRegExp,
        "Invalid alternate contact number"
    ),
    landmark: Yup.string().min(2, "Please enter valid landmark"),
});
const AddressForm = ({ button, onClose }) => {
    const dispatch = useDispatch();
    const { loading, error, success, message } = useSelector(
        (state) => state.newAddress
    );
    const handleAddressSubmit = (values) => {
        dispatch(addAddress(values));
    };

    useEffect(() => {
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
        if (success) {
            onClose();
            toaster.success(message);
            dispatch({ type: ADD_NEW_ADDRESS_RESET });
        }
    }, [error, success, message, dispatch, onClose]);
    return (
        <section className="bg-white p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-sm sm:text-xl flex items-center justify-between">
                    <i className="fas fa-map-marker-alt text-red-700 text-2xl" />
                    &nbsp;
                    <span className="font-medium text-gray-700">
                        Add a delivery address
                    </span>
                </h1>
                <button className="text-blue-600" onClick={onClose}>
                    Close
                </button>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAddressSubmit}
            >
                {(formik) => {
                    return (
                        <Form className="pt-6 w-full">
                            <div className="flex gap-4 items-center w-full">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="contact"
                                        className="text-sm pb-1"
                                    >
                                        Name*
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.name &&
                                            formik.errors.name
                                                ? "bg-red-50"
                                                : null
                                        } `}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="contact"
                                        className="text-sm pb-1"
                                    >
                                        Contact*
                                    </label>
                                    <Field
                                        id="contact"
                                        name="contact"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.contact &&
                                            formik.errors.contact
                                                ? "bg-red-50"
                                                : null
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="contact"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 items-center w-full pt-4">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="pincode"
                                        className="text-sm pb-1"
                                    >
                                        Pincode*
                                    </label>
                                    <Field
                                        id="pinCode"
                                        name="pinCode"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.pinCode &&
                                            formik.errors.pinCode
                                                ? "bg-red-50"
                                                : null
                                        } `}
                                    />
                                    <ErrorMessage
                                        name="pinCode"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="locality"
                                        className="text-sm pb-1"
                                    >
                                        Locality*
                                    </label>
                                    <Field
                                        id="locality"
                                        name="locality"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.locality &&
                                            formik.errors.locality
                                                ? "bg-red-50"
                                                : null
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="locality"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4 w-full">
                                <label htmlFor="address">Address*</label>
                                <Field
                                    as="textarea"
                                    name="address"
                                    rows="4"
                                    placeholder="(area and street)"
                                    className={`bg-gray-100 pt-2 w-full resize-none pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.address &&
                                        formik.errors.address
                                            ? "bg-red-50"
                                            : null
                                    } `}
                                />
                                <ErrorMessage
                                    name="address"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="state"
                                        className="text-sm pb-1"
                                    >
                                        State*
                                    </label>
                                    <Field
                                        id="state"
                                        name="state"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.state &&
                                            formik.errors.state
                                                ? "bg-red-50"
                                                : null
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="state"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="city"
                                        className="text-sm pb-1"
                                    >
                                        City/District/Town*
                                    </label>
                                    <Field
                                        id="city"
                                        name="city"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.city &&
                                            formik.errors.city
                                                ? "bg-red-50"
                                                : null
                                        } `}
                                    />
                                    <ErrorMessage
                                        name="city"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="landmark"
                                        className="text-sm pb-1"
                                    >
                                        Landmark*
                                    </label>
                                    <Field
                                        id="landmark"
                                        name="landmark"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.landmark &&
                                            formik.errors.landmark
                                                ? "bg-red-50"
                                                : null
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="landmark"
                                        component={FormError}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label
                                        htmlFor="alternatContact"
                                        className="text-sm pb-1"
                                    >
                                        Alternate contact (optional)
                                    </label>
                                    <Field
                                        id="alternatContact"
                                        name="alternatContact"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.alternatContact &&
                                            formik.errors.alternatContact
                                                ? "bg-red-50"
                                                : null
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="alternatContact"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 w-max m-auto">
                                <button
                                    type="submit"
                                    className="h-12 px-4 bg-blue-500 text-white font-medium w-full rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {loading && <Spinner />}
                                    {button}
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </section>
    );
};

export default AddressForm;
