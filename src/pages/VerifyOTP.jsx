import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MainNav from "../components/MainNav";
import { baseUrl } from "../utils";

const VerifyOTP = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state;
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);

  async function handleVerifyOTP(otp) {
    try {
      const { data } = await axios.post(`/api/verify/forgot/password/otp`, {
        contact,
        otp,
      });
      if (data.success) {
        navigate("/reset/password", { state: { contact } });
      }
    } catch (error) {
      setShowError(true);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setShowError(false);
        setMessage("");
      }, 3000);
    }
  }

  const handleChange = (e, index) => {
    if (e.target.value.length === 1 && index !== 5) {
      inputRefs[index + 1].current.focus();
    }
    const otpCopy = [...otp];
    otpCopy[index] = e.target.value;
    setOTP(otpCopy);

    // check if all otp fields are filled
    if (otpCopy.every((digit) => digit !== "")) {
      // verify otp
      handleVerifyOTP(otpCopy.join(""));
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col relative">
      <div className="absolute top-0 left-0 right-0">
        <MainNav />
      </div>
      <div className="h-full w-full flex items-center justify-center flex-col">
        <div className="h-12 w-12 bg-purple-200 flex items-center justify-center rounded-full mb-10">
          <LockOpenOutlinedIcon fontSize="medium" className="text-purple-500" />
        </div>
        <p className="text-2xl font-semibold text-golden uppercase ">
          Forgot Password?
        </p>
        <p className="text-gray-600 font-light">
          Don't worry! Follow the instructions and reset your password.
        </p>
        <p className="mt-8 font-normal text-gray-800 text-lg">
          Enter the password that has been send to{" "}
          <span className="text-red-600 font-semibold">{contact}</span>{" "}
          <Link
            to="/forgot/password"
            className="font-normal text-blue-600 cursor-pointer hover:text-blue-700"
          >
            Edit
          </Link>
        </p>
        {showError && (
          <p className="mt-6 bg-red-100 px-10 py-2 rounded border-2 border-red-400 text-red-600">
            {message}
          </p>
        )}
        <div className="grid grid-cols-6 gap-4 my-6">
          {otp.map((digit, index) => (
            <input
              type="text"
              key={index}
              ref={inputRefs[index]}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              className="border-2 border-gray-400 w-12 h-12 rounded text-center text-xl focus:border-blue-400 focus:shadow focus:shadow-blue-400"
            />
          ))}
        </div>
        <button
          className="w-max px-10 py-2 text-xl font-normal tracking-wider rounded text-white bg-red-600"
          onClick={() => handleVerifyOTP(otp.join(""))}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
