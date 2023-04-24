import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userAction";
import { useSnackbar } from "notistack";

const AccountNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const settingsOption = [
    { name: "Personal Information", link: "/account/settings" },
    { name: "Manage Address", link: "/account/address" },
  ];
  const stuffOption = [
    { name: "My Coupons", link: "/account/coupons" },
    { name: "Favourites", link: "/account/favourites" },
    { name: "My Cart", link: "/cart" },
    { name: "My Coupons", link: "/account/coupons" },
  ];
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    enqueueSnackbar("Logged out successfully", { variant: "success" });
  };
  return (
    <div className="flex-[0.3] flex flex-col min-h-full bg-white shadow-md rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b-[1px]">
        <img src="/images/profile-pic.svg" alt="profile pic" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-800">Hello,</span>
          <span className="text-red-600 font-semibold">Rajkumar Kalita</span>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="flex items-center justify-between p-4 border-b-[1px]">
          <Link to="/my-order" className="flex items-center gap-6">
            <DriveFileMoveIcon className="text-red-400" />
            <span className="uppercase font-semibold text-gray-500 tracking-wide">
              My orders
            </span>
          </Link>
          <ArrowForwardIosIcon fontSize="small" className="text-gray-500" />
        </div>

        <div className="border-b-[1px]">
          <div className="flex items-center justify-between p-4 ">
            <p className="flex items-center gap-6">
              <AccountBoxIcon className="text-red-400" />
              <span className="uppercase font-semibold text-gray-500 tracking-wide">
                Account settings
              </span>
            </p>
          </div>
          <div className="pb-4 flex flex-col">
            {settingsOption.map((item, i) => (
              <NavLink
                to={item.link}
                className={`pl-16 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:font-semibold cursor-pointer accountMenu`}
                key={i}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="border-b-[1px]">
          <div className="flex items-center justify-between p-4 ">
            <p className="flex items-center gap-6">
              <AccountBalanceWalletIcon className="text-red-400" />
              <span className="uppercase font-semibold text-gray-500 tracking-wide">
                My stuff
              </span>
            </p>
          </div>
          <div className="pb-4 flex flex-col">
            {stuffOption.map((item, i) => (
              <NavLink
                to={item.link}
                className="pl-16 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:font-semibold cursor-pointer accountMenu"
                key={i}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <p
          className="flex items-center gap-6 cursor-pointer hover:text-blue-700"
          onClick={logoutHandler}
        >
          <PowerSettingsNewIcon className="text-red-400" />
          <span className="uppercase font-semibold text-gray-500 tracking-wide hover:font-semibold hover:text-red-600">
            Logout
          </span>
        </p>
      </div>
    </div>
  );
};

export default AccountNav;
