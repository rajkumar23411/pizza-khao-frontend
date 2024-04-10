import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { phoneRegExp } from "../../utils";
import { FormError } from "./SignInForm";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../../redux/actions/userAction";
import Spinner from "../../components/Spinner";
import toaster from "react-hot-toast";
import { Link } from "react-router-dom";

const initialState = {
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
};

const validationSchema = yup.object({
    firstname: yup
        .string()
        .required("first name is required")
        .min(2, "Invalid first name")
        .max(20, "Maximum length exceeded"),
    lastname: yup
        .string()
        .required("last name is required")
        .min(2, "Invalid last name")
        .max(20, "Maximum length exceeded"),
    email: yup
        .string()
        .email("Invalid email id")
        .required("email id is required"),
    contact: yup
        .string()
        .required("Contact number is required")
        .matches(phoneRegExp, "Invalid contact number"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must of minimum 6 characters")
        .max(20, "Maximum password length exceeded"),
});
const Label = ({ htmlFor, name }) => {
    return (
        <label htmlFor={htmlFor} className="text-sm pb-1">
            {name}
        </label>
    );
};
const SignUpForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);
    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(register(values));
    };
    useEffect(() => {
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);
    return (
        <div>
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Welcome to Pizza Khao
                </h1>
                <p className="text-purple-600">
                    Enter below credentials carefully & register yourself.
                </p>
            </div>
            <Formik
                initialValues={initialState}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => {
                    return (
                        <Form className="w-[26rem] flex flex-col gap-4 mt-10">
                            <div className="flex gap-2">
                                <div>
                                    <Label
                                        htmlFor={"firstname"}
                                        name="First name*"
                                    />
                                    <Field
                                        name="firstname"
                                        id="firstname"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.firstname &&
                                            formik.errors.firstname
                                                ? "border border-red-400"
                                                : null
                                        } `}
                                    />
                                    <ErrorMessage
                                        name="firstname"
                                        component={FormError}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={"lastname"}
                                        name="Last name*"
                                    />
                                    <Field
                                        name="lastname"
                                        id="lastname"
                                        className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                            formik.touched.lastname &&
                                            formik.errors.lastname
                                                ? "border border-red-400"
                                                : null
                                        } `}
                                    />
                                    <ErrorMessage
                                        name="lastname"
                                        component={FormError}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor={"email"} name="Email*" />
                                <Field
                                    name="email"
                                    id="email"
                                    className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.email &&
                                        formik.errors.email
                                            ? "border border-red-400"
                                            : null
                                    } `}
                                />
                                <ErrorMessage
                                    name="email"
                                    component={FormError}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"contact"} name="Contact*" />
                                <Field
                                    name="contact"
                                    id="contact"
                                    className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.contact &&
                                        formik.errors.contact
                                            ? "border border-red-400"
                                            : null
                                    } `}
                                />
                                <ErrorMessage
                                    name="contact"
                                    component={FormError}
                                />
                            </div>
                            <div>
                                <Label htmlFor={"password"} name="Password*" />
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.password &&
                                        formik.errors.password
                                            ? "border border-red-400"
                                            : null
                                    } `}
                                />
                                <ErrorMessage
                                    name="password"
                                    component={FormError}
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-12 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium flex items-center justify-center gap-1"
                            >
                                {loading && <Spinner />}
                                Sign up
                            </button>
                            <div className="text-center">
                                <p>
                                    Already have an account? &nbsp;
                                    <Link
                                        to="/login"
                                        className="text-purple-500 cursor-pointer hover:text-purple-600"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SignUpForm;
