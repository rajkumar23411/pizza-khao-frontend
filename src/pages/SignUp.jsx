import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../redux/actions/userAction";
import toaster from "react-hot-toast";
import LoadingButton from "../components/LoadingButton";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disableRegisterButton, setDisableRegisterButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const useConstact = Number.parseInt(contactNumber);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, useConstact, password, email);
    dispatch(register(firstName, lastName, useConstact, password, email));
  };
  useEffect(() => {
    const isContactEmpty = contactNumber.trim().length === 0;
    const isPasswordEmpty = password.trim().length === 0;
    const isEmailEmpty = email.trim().length === 0;
    const isFirstNameEmpty = firstName.trim().length === 0;
    const isLastNameEmpty = lastName.trim().length === 0;
    const isInvalidLength = contactNumber.length !== 10;
    setDisableRegisterButton(
      isContactEmpty ||
        isPasswordEmpty ||
        isEmailEmpty ||
        isFirstNameEmpty ||
        isLastNameEmpty ||
        isInvalidLength
    );
  }, [contactNumber, password, email, firstName, lastName]);
  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate, toaster]);

  return (
    <section className="signUp">
      <div className="backdrop-blur-md w-max form flex items-center justify-center flex-col gap-10 rounded-lg p-5 sm:p-10">
        <div className="flex items-end gap-1">
          <h1 className="text-xl sm:text-3xl font-extrabold text-white">
            Welcome to Pizza Khao
          </h1>
          <div className="h-3 w-3 bg-red-600 rounded-full"></div>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="w-[18rem] sm:w-[24rem] h-10 sm:h-12 overflow-hidden inputDiv">
            <input
              type="text"
              placeholder="First name*"
              className="w-full h-full bg-transparent px-2 text-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-[18rem] sm:w-[24rem] h-10 sm:h-12 overflow-hidden inputDiv">
            <input
              type="text"
              placeholder="Last name*"
              className="w-full h-full bg-transparent px-2 text-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-[18rem] sm:w-[24rem]">
            <div className="w-full h-10 sm:h-12 overflow-hidden inputDiv">
              <input
                type="number"
                placeholder="Contact number*"
                className="w-full h-full bg-transparent px-2 text-white"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="w-full h-10 sm:h-12 overflow-hidden inputDiv">
              <input
                type="password"
                placeholder="Password*"
                className="w-full h-full bg-transparent px-2 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[18rem] sm:w-[24rem] h-10 sm:h-12 overflow-hidden inputDiv">
            <input
              type="email"
              placeholder="Email*"
              className="w-full h-full bg-transparent px-2 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {loading ? (
            <LoadingButton
              buttonText={"Creating account"}
              buttonColor={"bg-red-500"}
            />
          ) : (
            <button
              type="submit"
              className={`w-[18rem] sm:w-[24rem] h-10 sm:h-12 ${
                disableRegisterButton
                  ? "bg-red-500 shadow-red-600 cursor-default"
                  : "bg-red-600 hover:bg-red-800 shadow-red-800 cursor-pointer"
              } rounded-md overflow-hidden shadow-inner text-white flex items-center justify-center font-normal uppercase tracking-wide`}
              disabled={disableRegisterButton}
            >
              Register me
            </button>
          )}
          <div className="text-white text-xs sm:text-sm font-light text-center">
            * marked fields are mandatory
          </div>
          <div className="w-[18rem] sm:w-[24rem] text-center text-white">
            <span className="font-light">Already have an account? </span>
            <Link
              to="/login"
              className="font-light text-yellow-300 cursor-pointer hover:text-yellow-600"
            >
              Login now
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
