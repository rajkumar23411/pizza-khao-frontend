import React from "react";

const AdminMenuTag = ({ iconClass, label }) => {
  return (
    <div className="flex items-center gap-4 text-white py-1 px-2 w-full hover:bg-red-700 cursor-pointer rounded-md">
      <i className={`${iconClass} text-sm`}></i>
      <span className="font-light tracking-wide">{label}</span>
    </div>
  );
};

export default AdminMenuTag;
