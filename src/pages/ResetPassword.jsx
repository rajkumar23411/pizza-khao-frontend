import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MainNav from "../components/MainNav";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "./../redux/actions/userAction";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
const ResetPassword = () => {
  const { loading, success, error } = useSelector((state) => state.user);
  const loacation = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { contact } = loacation.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const [isDisbaled, setIsDisabled] = useState(true);
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar("Password doesn't match", { variant: "error" });
    } else {
      dispatch(resetPassword(Number(contact), password));
    }
  };
  useEffect(() => {
    if (password.length > 0 && confirmPassword.length > 0) {
      setIsDisabled(false);
      buttonRef.current.disabled = false;
    } else {
      setIsDisabled(true);
      buttonRef.current.disabled = true;
    }
  }, [password, confirmPassword, buttonRef]);

  useEffect(() => {
    if (success) {
      navigate("/");
      enqueueSnackbar("Password reset successfully", { variant: "success" });
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [success, error, enqueueSnackbar, navigate]);
  return (
    <>
      <MainNav />
      <div className="h-[88vh] w-full flex items-center justify-center flex-col">
        <LockOpenOutlinedIcon fontSize="large" className="text-red-600" />
        <form
          className="lg:w-[40%] md:w-[70%] flex items-center justify-center p-10 flex-col "
          onSubmit={handleResetPassword}
        >
          <h1 className="text-2xl font-semibold text-gray-700">
            Reset Password
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8 mt-2">
            <p className="text-gray-600">
              All set! Your can now set up a new password for your account.
            </p>
          </div>
          <div className="w-[75%] gap-6 flex items-center justify-center flex-col">
            <div className="w-full h-12 border-[1px] border-gray-500 rounded focus:bg-purple-600">
              <input
                type="password"
                placeholder="Enter your new password*"
                className="h-full w-full pl-2 bg-transparent placeholder:font-normal placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full h-12 border-[1px] border-gray-500 rounded focus:bg-purple-600">
              <input
                type="password"
                placeholder="Confirm password*"
                className="h-full w-full pl-2 bg-transparent placeholder:font-normal placeholder:text-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {loading ? (
              <LoadingButton
                loading
                variant="contained"
                className="h-12 w-full"
              >
                Reset Password
              </LoadingButton>
            ) : (
              <input
                type="submit"
                value="Reset password"
                ref={buttonRef}
                className={`h-12 w-full pl-2 text-white text-base font-semibold tracking-wide cursor-pointer rounded ${
                  isDisbaled ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                }`}
              />
            )}
            <Link
              to="/login"
              className="flex items-center justify-center text-purple-500 gap-2 hover:text-purple-700 cursor-pointer font-sans"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ArrowBackOutlinedIcon
                fontSize="small"
                className={
                  !isHovered &&
                  "transition ease-linear duration-150 translate-x-1"
                }
              />
              <p className="uppercase">Back to log in</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
