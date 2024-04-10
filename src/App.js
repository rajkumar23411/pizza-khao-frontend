import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import SinglePizza from "./pages/SinglePizza";
import { useEffect } from "react";
import Blog from "./pages/Blog";
import ResturentMenu from "./pages/ResturentMenu";
import MyOrder from "./pages/MyOrder";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import AccountAddress from "./pages/AccountAddress";
import store from "./redux/store";
import { clearError, loadUser } from "./redux/actions/userAction";
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
import { useSelector } from "react-redux";
import Dashboard from "./admin/pages/Dashboard";
import DashboardProducts from "./admin/pages/DashboardProducts";
import Orders from "./admin/pages/Orders";
import Coupon from "./admin/pages/Coupon";
import CouponUpdate from "./admin/pages/CouponUpdate";
import SingleOrderView from "./admin/pages/SingleOrderView";
import CategorizedPizza from "./pages/CategorizedPizza";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/components/EditProduct";
import DashboardLayout from "./admin/DashboardLayout";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";

const App = () => {
    const isSmallScreen = useMediaQuery("(max-width:650px)");
    const { pathname } = useLocation();
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    const { error } = useSelector((state) => state.user);
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode === 123) e.preventDefault();
    //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
    // });

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    useEffect(() => {
        if (error) store.dispatch(clearError());
    }, [error]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<SignInForm />} />
                <Route path="/register" element={<SignUpForm />} />
            </Route>

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
            <Route path="/pizza" element={<CategorizedPizza />} />
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
                        {isSmallScreen ? (
                            <AccountAddressMini />
                        ) : (
                            <AccountAddress />
                        )}
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

            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/verify/otp" element={<VerifyOTP />} />
            <Route path="/verify/login/otp" element={<VerifyLoginOTP />} />
            <Route path="/reset/password" element={<ResetPassword />} />
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
            {/* -------------------------ADMIN------------------------- */}
            <Route element={<DashboardLayout />}>
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/products"
                    element={
                        <ProtectedRoute>
                            <DashboardProducts />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/product/add"
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/coupons"
                    element={
                        <ProtectedRoute>
                            <Coupon />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/coupon/:id"
                    element={
                        <ProtectedRoute>
                            <CouponUpdate />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/order/:id"
                    element={
                        <ProtectedRoute>
                            <SingleOrderView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard/product/edit"
                    element={
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
