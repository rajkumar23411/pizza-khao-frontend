import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import { FORGOT_PASSWORD_RESET } from "../redux/constants/userConstant";

const ForgotPassword = () => {
  const [contact, setContact] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(Number(contact)));
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      dispatch({ type: FORGOT_PASSWORD_RESET });
      navigate("/verify/otp", { state: { contact } });
    }
  }, [error, success, dispatch, enqueueSnackbar]);
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col relative">
      <div className="absolute top-0 left-0 right-0">
        <MainNav />
      </div>
      <form
        action="#"
        className="lg:w-[30rem] md:w-[35rem] flex items-center justify-center py-10 rounded flex-col border-2 gap-6 p-10"
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

        {loading ? (
          <LoadingButton loading variant="contained" className="w-full h-12">
            Next
          </LoadingButton>
        ) : (
          <input
            type="submit"
            value="Next"
            className="bg-purple-500 text-white rounded w-full h-12 cursor-pointer hover:bg-purple-600 tracking-wider"
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
