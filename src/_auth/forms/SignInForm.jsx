import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toaster from "react-hot-toast";
import { clearError, login } from "../../redux/actions/userAction";
import Spinner from "../../components/Spinner";

export const FormError = (props) => {
    return <div className="text-red-600 text-sm">*{props.children}</div>;
};
const initialValues = {
    contact: "",
    password: "",
};
const validationSchema = Yup.object({
    contact: Yup.string()
        .required("Contact number is required")
        .matches(phoneRegExp, "Invalid contact number"),
    password: Yup.string().required("Password is required"),
});
const SignInForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const handleSubmitForm = (values) => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (error) {
            toaster.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);
    return (
        <div>
            <div className="flex items-center justify-center gap-1">
                <img
                    src="/assets/pizza-logo.svg"
                    alt="logo"
                    className="h-8 w-8"
                />
                <h1 className="text-xl font-medium text-gray-800 font-oswald">
                    Pizza Khao
                </h1>
            </div>
            <div className="text-center pt-6">
                <h1 className="text-2xl font-oswald text-gray-800">
                    Log in to your account
                </h1>
                <h2 className="text-sm text-red-500 pt-1">
                    Welcome back! Please enter your details.
                </h2>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
            >
                {(formik) => {
                    return (
                        <Form className="pt-12 w-[26rem]">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="contact"
                                    className="text-sm pb-1"
                                >
                                    Contact*
                                </label>
                                <Field
                                    type="number"
                                    id="contact"
                                    name="contact"
                                    className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.contact &&
                                        formik.errors.contact
                                            ? "border-2 border-red-400"
                                            : null
                                    } `}
                                />
                                <ErrorMessage
                                    name="contact"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex flex-col pt-4">
                                <label
                                    htmlFor="contact"
                                    className="text-sm pb-1"
                                >
                                    Password*
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`h-12 bg-gray-100 w-full pl-2 rounded-md focus-within:border-2 focus-within:border-purple-400 ${
                                        formik.touched.password &&
                                        formik.errors.password
                                            ? "border-2 border-red-400"
                                            : null
                                    }`}
                                />
                                <ErrorMessage
                                    name="password"
                                    component={FormError}
                                />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center justify-center gap-2 w-max">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-purple-600 bg-purple-600"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="cursor-pointer"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link
                                        to="/forgot/password"
                                        className=" text-purple-700 hover:text-purple-800 w-full"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="pt-8 w-full">
                                <button
                                    type="submit"
                                    className="h-12 bg-red-500 text-white font-medium w-full rounded-md hover:bg-red-600 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {loading && <Spinner />}
                                    Log in
                                </button>
                            </div>
                            <div className="pt-2 w-full">
                                <button
                                    type="submit"
                                    className="h-12 bg-purple-500 text-white font-medium w-full rounded-md hover:bg-purple-600 cursor-pointer"
                                >
                                    Request OTP
                                </button>
                            </div>
                            <div className="pt-6 flex items-center justify-center flex-row gap-1">
                                <p>Don't have an account?</p>
                                <Link
                                    to={"/register"}
                                    className="text-purple-600 hover:text-purple-700"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SignInForm;
