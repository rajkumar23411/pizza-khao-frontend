import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useSnackbar } from "notistack";
import MainNav from "../components/MainNav";
import { baseUrl } from "../utils";

const VerifyOTP = () => {
  const [otp, setOTP] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state;
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/verify/forgot/password/otp`,
        {
          contact,
          otp,
        }
      );
      if (data.success) {
        navigate("/reset/password", { state: { contact } });
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: "error" });
      setMessage("");
    }
  }, [message, enqueueSnackbar]);
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col relative">
      <div className="absolute top-0 left-0 right-0">
        <MainNav />
      </div>
      <div className="h-full w-full flex items-center justify-center flex-col">
        <div className="h-12 w-12 bg-purple-200 flex items-center justify-center rounded-full">
          <LockOpenOutlinedIcon fontSize="medium" className="text-purple-500" />
        </div>
        <form
          action="#"
          className="w-[40%] flex items-center justify-center p-10 flex-col "
          onSubmit={handleVerifyOTP}
        >
          <h1 className="text-2xl font-semibold text-gray-700">
            Forgot password?
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8 mt-2">
            <p className="text-gray-600">
              Enter the OTP that has been sent to{" "}
              <span className="text-purple-600 font-semibold">{contact}</span>
            </p>
            <Link
              to="/forgot/password"
              className="cursor-pointer text-red-600 font-semibold"
            >
              Edit
            </Link>
          </div>
          <div className="w-[75%] gap-6 flex items-center justify-center flex-col">
            <div className="w-full h-12 border-[1px] border-gray-500 rounded focus:bg-purple-600">
              <input
                type="number"
                placeholder="Enter the 6-digit OTP*"
                className="h-full w-full pl-2 bg-transparent placeholder:font-normal placeholder:text-gray-500"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="w-full h-12 bg-purple-600 rounded cursor-pointer hover:bg-purple-700">
              <input
                type="submit"
                value="Verify OTP"
                className="h-full w-full pl-2 bg-transparent text-white text-base font-semibold tracking-wide cursor-pointer"
              />
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center text-purple-500 gap-2 hover:text-purple-700 cursor-pointer font-sans"
            >
              <ArrowBackOutlinedIcon fontSize="small" />
              <p className="font-semibold">Back to log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
