import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    myAddresses,
    updateAddress,
    clearError,
} from "../redux/actions/addressAction";
import { UPDATE_ADDRESS_RESET } from "../redux/constants/addressConstant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toaster from "react-hot-toast";
import { FormError } from "../_auth/forms/SignInForm";
import { phoneRegExp } from "../utils";
import Spinner from "./Spinner";
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
const EditAddressForm = ({ onClose, address }) => {
    const { loading, error, isUpdated } = useSelector(
        (state) => state.updateAddress
    );
    const dispatch = useDispatch();

    const initialValues = {
        name: address.name,
        contact: address.contact,
        pinCode: address.pinCode,
        address: address.address,
        city: address.city,
        state: address.state,
        locality: address.locality,
        landmark: address.landmark,
        alternatContact: address.alternatContact,
    };
    const updateAddressSubmit = (values) => {
        dispatch(updateAddress(address._id, values));
    };
    useEffect(() => {
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
        if (isUpdated) {
            onClose();
            toaster.success("Address updated successfully");
            dispatch({ type: UPDATE_ADDRESS_RESET });
            dispatch(myAddresses());
        }
    }, [address, dispatch, isUpdated, onClose, error]);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateAddressSubmit}
        >
            {(formik) => {
                return (
                    <Form className="p-10 w-full">
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
                                <label htmlFor="state" className="text-sm pb-1">
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
                                <label htmlFor="city" className="text-sm pb-1">
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
                                Update Address
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EditAddressForm;
