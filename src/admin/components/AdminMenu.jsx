import React from "react";
import AdminMenuTag from "./AdminMenuTag";

const AdminMenu = () => {
  return (
    <div className="w-full admin-menu">
      <div className="border-y border-red-400">
        <AdminMenuTag iconClass="fal fa-user-alt" label="Profile" />
        <AdminMenuTag iconClass="fal fa-plus-circle" label="Manage Admin" />
        <AdminMenuTag iconClass="fal fa-lock-alt" label="Reset Password" />
        <AdminMenuTag iconClass="fal fa-user-headset" label="Help" />
        <AdminMenuTag iconClass="fal fa-exclamation-circle" label="Report" />
      </div>
      <div className="text-white flex items-center gap-4">
        <AdminMenuTag iconClass="fal fa-toggle-off" label="Logout" />
      </div>
    </div>
  );
};

export default AdminMenu;
