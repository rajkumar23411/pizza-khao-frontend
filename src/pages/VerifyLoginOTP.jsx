import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import HomeFooter from "../components/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import { clearError, verifyLoginOtp } from "../redux/actions/userAction";
import { useSnackbar } from "notistack";

const VerifyLoginOTP = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const location = useLocation();
  const { phone } = location.state;
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsdisabled] = useState(true);

  const handleVerifyOTP = (otp) => {
    dispatch(verifyLoginOtp(phone, otp));
  };
  const handleChange = (e, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = e.target.value;
    setOTP(otpCopy);

    if (e.target.value === "") {
      if (index > 0) {
        const previousInput = document.getElementById(`otp-${index - 1}`);
        previousInput.focus();
      }
    } else if (index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput.focus();
    }
    if (otpCopy.every((digit) => digit !== "")) {
      handleVerifyOTP(otpCopy.join(""));
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.key === "ArrowLeft") {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else if (e.key === "ArrowRight") {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [otp]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, navigate, isAuthenticated, enqueueSnackbar]);
  return (
    <>
      <MainNav />
      <form
        onSubmit={(e) => handleVerifyOTP(otp.join(""))}
        className="lg:min-h-[90vh] md:min-h-[40vh] flex items-center justify-center flex-col"
      >
        <h1 className="uppercase font-semibold text-golden text-2xl">
          Login Now!
        </h1>
        <p className="text-gray-600 font-light mt-6">
          Enter the OTP that has been send to{" "}
          <span className="text-red-600 font-normal">{phone}</span>
        </p>
        <div className="grid grid-cols-6 gap-4 my-6 w-max">
          {otp.map((digit, index) => (
            <input
              type="text"
              key={index}
              ref={inputRefs[index]}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              maxLength={1}
              id={`otp-${index}`}
              className="border-2 border-gray-400 w-12 h-12 rounded text-center text-lg focus:border-blue-400 focus:shadow"
            />
          ))}
        </div>
        {loading ? (
          <span className="flex items-center justify-center gap-2 bg-red-400 px-6 py-3 font-normal tracking-wider text-white uppercase rounded">
            <i className="fas fa-spinner fa-spin"></i>Verifying...
          </span>
        ) : (
          <input
            type="submit"
            value="Login"
            className={`px-6 h-12 text-white ${
              isDisabled ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            } rounded tracking-wider cursor-pointer uppercase`}
            disabled={isDisabled}
          />
        )}
      </form>

      <HomeFooter />
    </>
  );
};

export default VerifyLoginOTP;
