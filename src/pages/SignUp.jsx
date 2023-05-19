import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearError, register } from "../redux/actions/userAction";
import toaster from "react-hot-toast";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, contactNumber, password, email);
    dispatch(register(firstName, lastName, contactNumber, password, email));
  };

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
          <div className="w-[18rem] sm:w-[24rem] h-10 sm:h-12 bg-red-700 cursor-pointer rounded-md overflow-hidden hover:bg-red-800 shadow-inner shadow-red-800">
            <input
              type="submit"
              value="Submit"
              className="h-full w-full uppercase text-white font-medium cursor-pointer sm:text-base text-sm tracking-widest"
            />
          </div>
          <div className="text-white text-xs font-light text-center">
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
