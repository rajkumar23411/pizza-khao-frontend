import React from "react";

const ReportBox = ({ title, icon }) => {
  return (
    <div className="h-44 w-60 bg-white rounded-xl shadow-lg shadow-slate-200 p-6">
      <div className="flex justify-between flex-col h-full w-full">
        <i className={`${icon} text-2xl`}></i>
        <div>
          <p className="text-2xl font-medium text-gray-900">₹40,000.56</p>
          <p className="text-gray-400 text-base font-sans">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportBox;
