import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login, verifyLoginOtp } from "../redux/actions/userAction";
import { useSnackbar } from "notistack";
import axios from "axios";
import { baseUrl } from "../utils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(phone, password));
  };
  const handleLoginUsingOtp = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/login/contact`, {
      contact: phone,
    });

    if (data.success) {
      setOtpSent(true);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    dispatch(verifyLoginOtp(phone, Number(otp)));
  };
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
    <section className="signUp">
      <div className="backdrop-blur-md w-max form flex items-center justify-center flex-col gap-10 rounded-lg p-10">
        <div className="flex items-end gap-1">
          <h1 className="text-3xl font-extrabold text-white">
            Welcome Back Mate !
          </h1>
        </div>
        {otpSent ? (
          <form className="flex flex-col gap-6" onSubmit={handleVerifyOtp}>
            <h1 className=" w-full text-center text-base text-red-600">
              Please enter the OTP send to{" "}
              <span className="text-blue-600">9101121717</span>
            </h1>
            <div className="h-12 overflow-hidden inputDiv w-[22rem]">
              <input
                type="number"
                placeholder="OTP*"
                className="w-full h-full bg-transparent px-2 text-white"
                autoComplete="off"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="w-full h-12 bg-blue-600 cursor-pointer rounded-md overflow-hidden hover:bg-blue-800 shadow-inner shadow-blue-800">
              <input
                type="submit"
                value="Verify"
                className="w-full h-full text-white uppercase tracking-wider font-semibold cursor-pointer"
              />
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="h-12 overflow-hidden inputDiv w-[22rem]">
              <input
                type="number"
                placeholder="Contact number*"
                className="w-full h-full bg-transparent px-2 text-white"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="h-12 overflow-hidden inputDiv w-[22rem]">
              <input
                type="password"
                placeholder="Password*"
                className="w-full h-full bg-transparent px-2 text-white"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full h-12 bg-red-700 cursor-pointer rounded-md overflow-hidden hover:bg-red-800 shadow-inner shadow-red-800">
              <input
                type="submit"
                value="Login"
                className="h-full w-full uppercase text-white font-semibold tracking-wider cursor-pointer"
              />
            </div>
            <div className="w-full h-12 bg-blue-600 cursor-pointer rounded-md overflow-hidden hover:bg-blue-800 shadow-inner shadow-blue-800">
              <input
                type="submit"
                value="Request OTP"
                className="w-full h-full text-white uppercase tracking-wider font-semibold cursor-pointer"
                onClick={handleLoginUsingOtp}
              />
            </div>
            <div className="w-full text-center text-white">
              <span className="font-normal">Don't have an account? </span>
              <Link
                to="/register"
                className="font-normal text-yellow-300 cursor-pointer hover:text-yellow-600"
              >
                Register now
              </Link>
            </div>
            <Link
              to="/forgot/password"
              className="w-full text-center text-slate-100 cursor-pointer hover:text-sky-300"
            >
              <span>Forgot password ?</span>
            </Link>
          </form>
        )}
      </div>
    </section>
  );
};

export default Login;
