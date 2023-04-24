import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/actions/userAction";
import { login } from "../redux/actions/userAction";

const CheckoutLoginForm = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(contact, password));
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
  }, [dispatch, error, enqueueSnackbar]);
  return (
    <form
      className="checkout_login_form w-[70%] mt-4 flex flex-col gap-4"
      onSubmit={handleLoginSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="contact" className="text-sm">
          Contact No.*
        </label>
        <input
          type="number"
          className="border-2 py-2 rounded pl-2 focus:border-red-300"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm">
          Password*
        </label>
        <input
          type="password"
          className="border-2 py-2 rounded pl-2 focus:border-red-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Login"
        className="bg-red-500 text-white py-2 uppercase tracking-wider font-semibold rounded cursor-pointer hover:bg-red-600"
      />
    </form>
  );
};

export default CheckoutLoginForm;
