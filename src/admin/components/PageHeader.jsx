import React, { useEffect, useState } from "react";
import PageTracker from "./PageTracker";
import AdminMenu from "./AdminMenu";
import AdminMenuProfileData from "./AdminMenuProfileData";

const PageHeader = ({ pagetitle }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = (e) => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("menu-button")) {
                return;
            }
            setShowMenu(false);
        });
        window.addEventListener("scroll", (e) => {
            setShowMenu(false);
        });
    }, []);
    return (
        <section className="w-full flex items-center justify-between p-4">
            <PageTracker pagename={pagetitle} />
            <section className="">
                <div className="relative">
                    <img
                        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/profile-pic.svg?updatedAt=1683123633470"
                        alt="profile"
                        className="h-10 w-10 rounded-full overflow-hidden object-cover border-2 border-white drop-shadow-lg cursor-pointer menu-button"
                        onClick={toggleMenu}
                    />
                    <div
                        className={`${
                            showMenu ? "scale-100" : "scale-0"
                        } absolute bg-red-600 w-48 right-4 rounded-md top-12 drop-shadow-2xl transform origin-top-right transition-all duration-300 ease-in-out z-40`}
                    >
                        <AdminMenuProfileData />
                        <div className="border-b border-gray-300 w-full p-2 ">
                            <AdminMenu />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default PageHeader;
