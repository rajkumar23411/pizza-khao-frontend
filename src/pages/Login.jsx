import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login } from "../redux/actions/userAction";
import axios from "axios";
import toaster from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otpLoader, setOtpLoader] = useState(false);
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(true);
  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const userNumber = Number.parseInt(contact);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userNumber, password));
  };
  const handleLoginUsingOtp = async (e) => {
    setOtpLoader(true);
    try {
      const { data } = await axios.post(`/api/login/contact`, {
        userNumber,
      });
      if (data.success) {
        navigate(`/verify/login/otp`, { state: { userNumber } });
      }
    } catch (error) {
      toaster.error(error.response.data.message);
    } finally {
      setOtpLoader(false);
    }
  };

  useEffect(() => {
    // Check if the input value is empty or the length is not equal to 10
    const isInputEmpty = contact.trim().length === 0;
    const isPasswordEmpty = password.trim().length == 0;
    const isInvalidLength = contact.length !== 10;
    setIsOTPButtonDisabled(isInputEmpty || isInvalidLength);
    setLoginButtonDisabled(isInputEmpty || isPasswordEmpty || isInvalidLength);
  }, [contact, password]);

  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/");
      toaster.success("Logged in successfully");
    }
  }, [dispatch, error, navigate, isAuthenticated, toaster]);
  return (
    <section className="signUp">
      <div className="backdrop-blur-md w-max form flex items-center justify-center flex-col gap-10 rounded-lg p-5 sm:p-10">
        <div className="flex items-end gap-1">
          <h1 className="text-xl sm:text-3xl font-extrabold text-white">
            Welcome Back Mate!
          </h1>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="h-10 sm:h-12 overflow-hidden inputDiv w-[18rem] sm:w-[22rem]">
            <input
              type="number"
              placeholder="Contact number*"
              className="w-full h-full bg-transparent px-2 text-white placeholder:font-light"
              autoComplete="off"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="h-10 sm:h-12 overflow-hidden inputDiv w-[18rem] sm:w-[22rem]">
            <input
              type="password"
              placeholder="Password*"
              className="w-full h-full bg-transparent px-2 text-white placeholder:font-light"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="w-full h-10 sm:h-12 bg-red-500 text-white cursor-pointer rounded-md text-sm uppercase flex items-center justify-center gap-2 overflow-hidden shadow-inner">
              <i className="fas fa-spinner fa-spin text-xl"></i>
              Logging in...
            </div>
          ) : (
            <div
              className={`w-full h-11 ${
                isLoginButtonDisabled
                  ? "bg-red-400 shadow-red-500"
                  : "bg-red-600 hover:bg-red-700 shadow-red-800"
              } cursor-pointer rounded text-xs sm:text-base shadow-inner overflow-hidden`}
            >
              <input
                type="submit"
                value="Login"
                className="h-full w-full uppercase text-white font-medium tracking-wider cursor-pointer sm:text-base text-sm"
                disabled={isLoginButtonDisabled}
              />
            </div>
          )}
          {otpLoader ? (
            <div
              className={`w-full h-10 sm:h-12 bg-blue-500 text-white cursor-pointer rounded-md text-sm uppercase flex items-center justify-center gap-2 overflow-hidden shadow-inner`}
            >
              <i className="fas fa-spinner fa-spin text-xl"></i>
              Loading...
            </div>
          ) : (
            <div
              className={`w-full h-11 ${
                isOTPButtonDisabled
                  ? "bg-blue-400 shadow-blue-500"
                  : "bg-blue-600  hover:bg-blue-800 shadow-blue-800"
              } cursor-pointer rounded overflow-hidden shadow-inner `}
            >
              <input
                type="submit"
                value="Request OTP"
                className="w-full h-full text-white uppercase tracking-wider font-medium cursor-pointer text-sm sm:text-base"
                onClick={handleLoginUsingOtp}
                disabled={isOTPButtonDisabled}
              />
            </div>
          )}
          <div className="w-full text-center text-white">
            <span className="font-light">Don't have an account? </span>
            <Link
              to="/register"
              className="font-light cursor-pointer hover:text-yellow-600 underline text-yellow-400"
            >
              Create now
            </Link>
          </div>
          <Link
            to="/forgot/password"
            className="w-full font-light text-center text-slate-100 cursor-pointer hover:text-sky-300"
          >
            <span>Forgot password?</span>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
