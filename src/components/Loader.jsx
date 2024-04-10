import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-96 w-full flex-col gap-2">
            <i className="fas fa-spinner fa-spin text-5xl text-gray-600"></i>
            <p className="font-light text-gray-800 animate-pulse">
                Hang on! Fetching your data...
            </p>
        </div>
    );
};

export default Loader;
