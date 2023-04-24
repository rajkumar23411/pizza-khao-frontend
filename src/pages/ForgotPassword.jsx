import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const [contact, setContact] = useState();
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/forgot/password", { contact });
      if (data.success) {
        navigate("/verify/otp", { state: { contact } });
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(err.response.data.message);
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
      <form
        action="#"
        className="w-[30rem] flex items-center justify-center py-10 rounded flex-col border-2 gap-6 p-10"
        onSubmit={handleSendOTP}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 bg-purple-200 flex items-center justify-center rounded-full mb-6">
            <LockOpenOutlinedIcon
              fontSize="medium"
              className="text-purple-500"
            />
          </div>
          <h1 className="text-2xl font-medium text-gray-700">
            Forgot password?
          </h1>
          <p className="text-gray-500 text-center mb-8 font-light">
            No worries! Follow up the steps and reset your password
          </p>
        </div>
        <div className="w-full h-12 border-[1px] border-gray-500 rounded focus:bg-purple-600">
          <input
            type="number"
            placeholder="Enter registered contact number*"
            className="h-full w-full pl-2 bg-transparent placeholder:text-gray-500 placeholder:font-light"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="w-full h-12 bg-purple-600 rounded cursor-pointer hover:bg-purple-700">
          <input
            type="submit"
            value="Next"
            className="h-full w-full pl-2 bg-transparent text-white text-lg tracking-normal cursor-pointer"
          />
        </div>
        <Link
          to="/login"
          className="flex items-center justify-center text-purple-500 gap-2 hover:text-purple-700 cursor-pointer font-sans"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowBackOutlinedIcon
            fontSize="small"
            className={
              !isHovered && "transition ease-linear duration-150 translate-x-1"
            }
          />
          <p className="uppercase">Back to log in</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
