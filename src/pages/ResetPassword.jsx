import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MainNav from "../components/MainNav";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "./../redux/actions/userAction";
const ResetPassword = () => {
  const { success, error } = useSelector((state) => state.user);
  const loacation = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { contact } = loacation.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar("Password doesn't match", { variant: "error" });
    } else {
      dispatch(resetPassword(Number(contact), password));
    }
  };
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
    <div className="h-screen w-screen flex items-center justify-center flex-col relative">
      <div className="absolute top-0 left-0 right-0">
        <MainNav />
      </div>
      <div className="h-full w-full flex items-center justify-center flex-col">
        <LockOpenOutlinedIcon fontSize="large" className="text-red-600" />
        <form
          className="w-[40%] flex items-center justify-center p-10 flex-col "
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
            <div className="w-full h-12 bg-purple-600 rounded cursor-pointer hover:bg-purple-700">
              <input
                type="submit"
                value="Reset password"
                className="h-full w-full pl-2 bg-transparent text-white text-base font-semibold tracking-wide cursor-pointer"
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
                  !isHovered &&
                  "transition ease-linear duration-150 translate-x-1"
                }
              />
              <p className="uppercase">Back to log in</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
