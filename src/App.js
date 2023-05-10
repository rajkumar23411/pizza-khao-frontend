import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import SinglePizza from "./pages/SinglePizza";
import { useEffect, useState } from "react";
import Blog from "./pages/Blog";
import ResturentMenu from "./pages/ResturentMenu";
import MyOrder from "./pages/MyOrder";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import AccountAddress from "./pages/AccountAddress";
import store from "./redux/store";
import { clearError, loadUser } from "./redux/actions/userAction";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddPizza from "./pages/AddPizza";
import WishList from "./pages/WishList";
import OrderSuccess from "./pages/OrderSuccess";
import VerifyPayment from "./pages/VerifyPayment";
import TransactionFail from "./pages/TransactionFail";
import ProtectedRoute from "./protectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import SearchMenu from "./pages/SearchMenu";
import MenuLight from "./pages/MenuLight";
import VerifyLoginOTP from "./pages/VerifyLoginOTP";
import { useMediaQuery } from "@mui/material";
import MyAccountMini from "./pages/MyAccountMini";
import AccountAddressMini from "./pages/AccountAddressMini";
import { motion } from "framer-motion";
const App = () => {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const [isWindowLoading, setIsWindowLoading] = useState(true);
  const { pathname } = useLocation();
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsWindowLoading(false);
    });
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return isWindowLoading ? (
    <section className="overflow-hidden">
      <motion.div
        className="w-screen h-screen flex items-center justify-center"
        initial={{ opacity: 0, scale: 10 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: 0, delay: 0.5 }}
      >
        <div className="flex items-center justify-center flex-col">
          <img
            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/logo_C0ZhYDynQ?updatedAt=1683731113359"
            alt="Logo"
            className="sm:h-52"
          />
          <span className="uppercase font-light tracking-widest text-3xl text-red-500">
            Slice of heaven
          </span>
        </div>
      </motion.div>
    </section>
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pizza/:id" element={<SinglePizza />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/resturent-menu" element={<ResturentMenu />} />
      <Route
        path="/my-order"
        element={
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        }
      />
      <Route path="/checkout" element={<CheckOut />} />
      <Route
        path="/account/settings"
        element={
          <ProtectedRoute>
            {isSmallScreen ? <MyAccountMini /> : <MyAccount />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/address"
        element={
          <ProtectedRoute>
            {isSmallScreen ? <AccountAddressMini /> : <AccountAddress />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/account/favourites"
        element={
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/verify/otp" element={<VerifyOTP />} />
      <Route path="/verify/login/otp" element={<VerifyLoginOTP />} />
      <Route path="/reset/password" element={<ResetPassword />} />
      <Route
        path="/add/pizza"
        element={
          <ProtectedRoute>
            <AddPizza />
          </ProtectedRoute>
        }
      />
      <Route path="/menu/:keyword" element={<SearchMenu />} />
      <Route path="/pizza/:keyword" element={<Menu />} />
      <Route
        path="/order/success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verifypayment"
        element={
          <ProtectedRoute>
            <VerifyPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction/fail"
        element={
          <ProtectedRoute>
            <TransactionFail />
          </ProtectedRoute>
        }
      />
      <Route path="/menu-light" element={<MenuLight />} />
    </Routes>
  );
};

export default App;
