import React from "react";
import { Link } from "react-router-dom";

const CategoryBox = ({ title, markup, uniqueClass }) => {
    const keyword = title.split(" ").join("-").toLowerCase();
    return (
        <Link to={`/pizza?category=${keyword}`}>
            <div
                className={`rounded-2xl overflow-hidden cursor-pointer category_box ${uniqueClass}`}
            >
                <div>
                    <p className="font-oswald ">{title}</p>
                    <small>{markup}</small>
                </div>
            </div>
        </Link>
    );
};
const HomeCategory = () => {
    return (
        <section className="flex items-center justify-center py-10 sm:p-10 flex-col gap-6">
            <div className="text-center">
                <h1 className="text-purple-600">
                    Enjoy the delicasy of pizzas
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium font-oswald uppercase">
                    Explore our popular categories
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CategoryBox
                    title={"Cheese"}
                    markup={
                        "Indulge in cheesy delights - The perfect comfort food!"
                    }
                    uniqueClass={"box_1"}
                />
                <CategoryBox
                    title={"Veggie"}
                    markup={
                        "Fresh & flavorful - Explore our veggie delicacies!"
                    }
                    uniqueClass={"box_2"}
                />
                <CategoryBox
                    title={"Piquant"}
                    markup={
                        "Spice up your taste buds - Discover our piquant pizza selection!"
                    }
                    uniqueClass={"box_3"}
                />
                <CategoryBox
                    title={"For Kids"}
                    markup={
                        "Kid-friendly favorites - Delightful pizzas for the little ones!"
                    }
                    uniqueClass={"box_4"}
                />
            </div>
            <Link
                to="menu-light"
                className="font-roboto text-red-600 border-2 border-red-600 py-2 px-4 text-sm md:px-4 md:py-2 md:text-lg rounded-3xl hover:bg-red-600 hover:text-white font-medium"
            >
                View all
            </Link>
        </section>
    );
};

export default HomeCategory;
