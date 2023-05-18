import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, login } from "../redux/actions/userAction";
import { useSnackbar } from "notistack";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [otpLoader, setOtpLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(phone, password));
  };
  const handleLoginUsingOtp = async (e) => {
    e.preventDefault();
    setOtpLoader(true);
    const { data } = await axios.post(`/api/login/contact`, {
      contact: phone,
    });

    if (data.success) {
      navigate(`/verify/login/otp`, { state: { phone } });
    }
    setOtpLoader(false);
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
      <div className="backdrop-blur-md w-max form flex items-center justify-center flex-col gap-10 rounded-lg p-5 sm:p-10">
        <div className="flex items-end gap-1">
          <h1 className="text-xl sm:text-3xl font-extrabold text-white">
            Welcome Back Mate !
          </h1>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="h-10 sm:h-12 overflow-hidden inputDiv w-[18rem] sm:w-[22rem]">
            <input
              type="number"
              placeholder="Contact number*"
              className="w-full h-full bg-transparent px-2 text-white"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="h-10 sm:h-12 overflow-hidden inputDiv w-[18rem] sm:w-[22rem]">
            <input
              type="password"
              placeholder="Password*"
              className="w-full h-full bg-transparent px-2 text-white"
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
            <div className="w-full h-10 sm:h-12 bg-red-700 cursor-pointer rounded text-xs sm:text-base overflow-hidden hover:bg-red-800 shadow-inner shadow-red-800">
              <input
                type="submit"
                value="Login"
                className="h-full w-full uppercase text-white font-medium tracking-wider cursor-pointer sm:text-base text-sm"
              />
            </div>
          )}
          {otpLoader ? (
            <div className="w-full h-10 sm:h-12 bg-red-500 text-white cursor-pointer rounded-md text-sm uppercase flex items-center justify-center gap-2 overflow-hidden shadow-inner">
              <i className="fa-duotone fa-loader fa-spin-pulse text-xl"></i>
              Loading...
            </div>
          ) : (
            <div className="w-full h-10 sm:h-12 bg-blue-600 cursor-pointer rounded overflow-hidden hover:bg-blue-800 shadow-inner shadow-blue-800">
              <input
                type="submit"
                value="Request OTP"
                className="w-full h-full text-white uppercase tracking-wider font-medium cursor-pointer text-sm sm:text-base"
                onClick={handleLoginUsingOtp}
              />
            </div>
          )}
          <div className="w-full text-center text-white">
            <span className="font-light">Don't have an account? </span>
            <Link
              to="/register"
              className="font-light text-yellow-300 cursor-pointer hover:text-yellow-600"
            >
              Register now
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
