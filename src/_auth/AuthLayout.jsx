import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AuthLayout = () => {
    const { isAuthenticated } = useSelector((state) => state.user);
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <section className="flex bg-white">
                    <section className="flex flex-1 justify-center items-center flex-col py-10">
                        <Outlet />
                    </section>
                    <img
                        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/sign-up-bg.jpg?updatedAt=1683123635585"
                        alt="logo"
                        className="hidden xl:block w-1/2 h-screen object-cover bg-no-repeat"
                    />
                </section>
            )}
        </>
    );
};

export default AuthLayout;
