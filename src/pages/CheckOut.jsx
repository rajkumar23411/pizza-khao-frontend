import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import OrderedItems from "../components/OrderedItems";
import { useDispatch, useSelector } from "react-redux";
import CheckoutLoginForm from "../components/CheckoutLoginForm";
import { myAddresses } from "../redux/actions/addressAction";
import { Radio, useMediaQuery } from "@mui/material";
import { clearErrors, createOrder } from "../redux/actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import toaster from "react-hot-toast";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { NEW_ORDER_RESET } from "../redux/constants/orderConstant";
import AddressForm from "./../components/AddressForm";
import PageHead from "../components/PageHead";
import Loader from "./../components/Loader";
import HomeFooter from "../components/HomeFooter";

const Button = ({ handleClick, children }) => {
    return (
        <button
            className="text-white bg-[#d2401e] w-max rounded font-roboto tracking-tight px-4 py-2 text-sm sm:text-base hover:bg-[#b9381b]"
            onClick={handleClick}
        >
            {children}
        </button>
    );
};
const CheckoutStep = (props) => {
    return (
        <div className="bg-white shadow-sm w-full rounded-md overflow-hidden">
            <div
                onClick={props.onClick}
                className={`w-full ${props.active && "bg-red-600"}`}
            >
                <div className="flex items-center lg:gap-6 gap-3 lg:px-10 px-5 sm:py-3 py-2">
                    <p
                        className={`h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-semibold ${
                            props.active ? "text-red-700" : "text-gray-600"
                        }  rounded bg-slate-100 sm:text-base text-xs`}
                    >
                        {props.stepNumber}
                    </p>
                    <p
                        className={`uppercase sm:text-base text-sm tracking-wider font-oswald text-gray-800 font-normal ${
                            props.active && "text-white"
                        }`}
                    >
                        {props.title}
                    </p>
                </div>
            </div>
            <div className={props.body && "lg:px-10 lg:py-3 md:p-5 px-5 py-3"}>
                {props.body && props.body}
            </div>
        </div>
    );
};
const Address = ({ address, confirmDeliveryAddress, selectAddress }) => {
    const isSmallScreen = useMediaQuery("(max-width:600px)");

    return (
        <div
            className={`flex flex-col border-b border-gray-200 last:border-none py-4`}
        >
            <div className="flex items-start justify-start gap-4">
                <Radio
                    onClick={() => selectAddress(address)}
                    size={isSmallScreen ? "small" : "medium"}
                    id="select_address"
                />
                <label id="select_address" className="flex flex-col">
                    <div className="flex gap-5">
                        <p className="text-gray-700 text-sm sm:text-base font-medium font-roboto">
                            {address.name}&nbsp; &mdash; &nbsp;
                            {address.contact}
                        </p>
                    </div>
                    <div className="text-gray-800 font-normal flex items-center gap-1 lg:text-base md:text-sm text-xs pt-2">
                        {address.locality}, {address.address},{" "}
                        {address.landMark}{" "}
                        {address.alternatContact
                            ? `, ${address.alternatContact}`
                            : null}{" "}
                        <br /> {address.state} - {address.pinCode}
                    </div>
                    {address.selected && (
                        <button
                            className="bg-blue-500 rounded mt-6 text-white font-normal text-sm px-4 py-2 w-max sm:text-base"
                            onClick={() => confirmDeliveryAddress(address)}
                        >
                            Deliver here
                        </button>
                    )}
                </label>
            </div>
        </div>
    );
};
const CheckOut = () => {
    const {
        isAuthenticated,
        user,
        loading: userLoading,
    } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.myCart);
    const dispatch = useDispatch();
    const Razorpay = useRazorpay();
    const [newAddress, setNewAddress] = useState(false);
    const { addresses, loading: addressLoading } = useSelector(
        (state) => state.myAddresses
    );
    const { success: addAddressSuccess } = useSelector(
        (state) => state.newAddress
    );
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelctedAddress] = useState({});
    const [address, setAddress] = useState([]);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [selectPaymentOption, setSelectPaymentOption] = useState("");
    const navigate = useNavigate();
    const { success, error } = useSelector((state) => state.newOrder);
    const totalPrice = cart?.totalPrice;
    const tax = Math.round((cart?.totalPrice / 100) * 5);
    const shipping = cart && Number(cart.totalPrice <= 300 ? 50 : 0);
    const total = Number(totalPrice + tax + shipping).toFixed(2);

    const selectAddress = (adrs) => {
        const address = addresses.map((adr) =>
            adr._id === adrs._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        );
        setAddress(address);
    };
    const confirmDeliveryAddress = (addr) => {
        setConfirmAddress(true);
        setSelctedAddress(addr);
        setOrderSummary(true);
    };

    const proceedNext = () => {
        setOrderSummary(false);
        setOrderConfirmed(true);
        setShowOrderSummary(true);
        setPaymentOption(true);
    };

    const confirmOrder = async () => {
        const addressId = selectedAddress._id;
        const orderItems = cart?.items?.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
            size: item.size,
        }));

        const orderData = {
            items: orderItems,
            addressId,
            itemsPrice: totalPrice,
            tax: tax,
            deliveryCharge: shipping,
            totalAmount: Number(total),
            paymentMode: selectPaymentOption,
        };

        if (selectPaymentOption === "cod") {
            dispatch(createOrder(orderData));
            setPaymentOption(false);
        }
        if (selectPaymentOption === "online") {
            try {
                const { data } = await axios.get(`/api/getapikey`);
                const {
                    data: { order },
                } = await axios.post(`/api/create-rzp-order`, {
                    amount: orderData.totalAmount,
                });
                const options = {
                    key: data.key,
                    amount: orderData.totalAmount * 100,
                    currency: "INR",
                    name: "Pizza-Khao",
                    description: "Pizza-khao payment",
                    order_id: order.id,
                    image: "https://avatars.githubusercontent.com/u/90103892?s=400&u=1147637f019bbb8a63f51fed38a6f0a5e02371d2&v=4",
                    handler: function (response) {
                        axios
                            .post(`/api/verifypayment`, {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            })
                            .then((res) => {
                                if (res.data.success === true) {
                                    orderData.paymentInfo = {
                                        transactionId:
                                            res.data.razorpay_payment_id,
                                        transactionStatus: "success",
                                        paidAt: Date.now(),
                                    };
                                    dispatch(createOrder(orderData));
                                    setPaymentOption(false);
                                }
                            })
                            .catch((err) => {
                                setPaymentOption(false);
                                navigate("/transaction/fail");
                            });
                    },
                    prefill: {
                        name: `${user.firstName} ${user.lastName}}`,
                        email: user.email,
                        contact: user.contact,
                    },
                    notes: {
                        address: "Pizza-Khao Pvt. Ltd.",
                    },
                    theme: {
                        color: "#c0392b",
                    },
                };
                const razorpay = new Razorpay(options);
                razorpay.open();
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        if (success) {
            navigate("/order/success");
            dispatch({ type: NEW_ORDER_RESET });
        }
        if (error) {
            toaster.error(error);
            dispatch(clearErrors());
        }

        if (addAddressSuccess) {
            dispatch(myAddresses());
        }
        dispatch(myAddresses());
    }, [success, error, navigate, addAddressSuccess, dispatch]);

    useEffect(() => {
        const address = addresses?.map((adr) => ({ ...adr, selected: false }));
        setAddress(address);
    }, [addresses]);
    return (
        <>
            <MainNav />
            <PageHead pageName={"Checkout"} />
            {cart?.items?.length === 0 ? (
                <div className="flex justify-center items-center h-full py-10 flex-col">
                    <img
                        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/empty_cart.svg?updatedAt=1683123625381"
                        alt="empty cart"
                        className="h-60"
                    />
                    <h1 className="text-2xl font-medium mt-6 text-gray-700">
                        Oops! Nothing here to checkout
                    </h1>
                    <p className="text-lg font-light">
                        No item found in your cart
                    </p>
                    <Link
                        to="/menu"
                        className="bg-red-600 text-white px-4 py-2 rounded-sm text-lg mt-4 hover:bg-red-700"
                    >
                        Go to menu
                    </Link>
                </div>
            ) : (
                <div className="lg:min-h-screen md:min-h-max w-full bg-slate-50 p-3 sm:py-20 lg:px-40 md:px-10 md:py-10 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                        <CheckoutStep
                            stepNumber={1}
                            title="Login"
                            active={!isAuthenticated}
                            body={
                                userLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <div className="flex items-start gap-4 text-sm sm:text-base font-medium lg:pl-12 md:pl-4 text-gray-700">
                                        <i className="fas fa-check-circle text-xl text-green-500"></i>
                                        <div className="flex items-center gap-4">
                                            <p className="capitalize font-roboto text-gray-800 text-lg">
                                                {user.firstname} {user.lastname}
                                            </p>
                                            &mdash;
                                            <span>{user.contact}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <CheckoutLoginForm />
                                )
                            }
                        />
                        <CheckoutStep
                            stepNumber={2}
                            title="Delivery Address"
                            active={!confirmAddress && isAuthenticated}
                            body={
                                addressLoading ? (
                                    <Loader />
                                ) : address?.length === 0 ? (
                                    <AddressForm
                                        onCancel={() => setNewAddress(false)}
                                        button={"Save and deliver here"}
                                    />
                                ) : confirmAddress ? (
                                    selectedAddress && (
                                        <div className="flex flex-col gap-2 lg:pl-12 md:pl-4">
                                            <p className="text-gray-700 font-medium text-sm sm:text-base">
                                                {selectedAddress.name} -{" "}
                                                {selectedAddress.contact}
                                            </p>
                                            {selectedAddress && (
                                                <p className="text-gray-600 font-normal sm:text-base text-sm">
                                                    {selectedAddress.locality},{" "}
                                                    {selectedAddress.address},{" "}
                                                    {selectedAddress.landMark},{" "}
                                                    {
                                                        selectedAddress.alternateContact
                                                    }{" "}
                                                    <br />{" "}
                                                    {selectedAddress.state} -{" "}
                                                    {selectedAddress.pinCode}
                                                </p>
                                            )}
                                        </div>
                                    )
                                ) : (
                                    address?.map((adrs) => (
                                        <Address
                                            address={adrs}
                                            confirmDeliveryAddress={
                                                confirmDeliveryAddress
                                            }
                                            selectAddress={selectAddress}
                                        />
                                    ))
                                )
                            }
                        />
                        {address?.length !== 0 &&
                            (confirmAddress ? null : newAddress ? (
                                <AddressForm
                                    button={"Save and Deliver here"}
                                    onClose={() => setNewAddress(false)}
                                />
                            ) : isAuthenticated ? (
                                <CheckoutStep
                                    stepNumber={"+"}
                                    title={"ADD NEW ADDRESS"}
                                    active={false}
                                    onClick={() => setNewAddress(true)}
                                    bg="bg-white"
                                />
                            ) : null)}
                        <CheckoutStep
                            stepNumber={3}
                            title="ORDER SUMMARY"
                            active={orderSummary}
                            body={
                                <>
                                    {orderSummary ? (
                                        <>
                                            <OrderedItems items={cart.items} />
                                            <div className="mt-4 w-full">
                                                <Button
                                                    handleClick={proceedNext}
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        </>
                                    ) : null}
                                    {showOrderSummary && (
                                        <div className="flex-col gap-3 sm:gap-6 flex">
                                            {cart.items.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center gap-4 sm:gap-6 lg:px-10 md:px-5"
                                                >
                                                    <div className="h-16 w-16 sm:h-24 sm:w-24">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .image
                                                            }
                                                            alt={
                                                                item.product
                                                                    .image
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="leading-5">
                                                        <p className="text-golden font-medium font-oswald uppercase tracking-wide text-sm sm:text-base">
                                                            {item.product.name}
                                                        </p>
                                                        <p className="capitalize text-gray-600 font-light text-xs sm:text-sm">
                                                            Size: {item.size}
                                                        </p>
                                                        <p className="text-gray-600 font-light text-xs sm:text-sm">
                                                            Quantity:{" "}
                                                            {item.quantity}
                                                        </p>
                                                        <p className="font-medium font-oswald text-gray-600 text-sm sm:text-lg">
                                                            ₹
                                                            {item.quantity *
                                                                item.product
                                                                    .prices[
                                                                    item.size
                                                                ]}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            }
                        />
                        <CheckoutStep
                            stepNumber={4}
                            title="Payment Options"
                            active={paymentOption}
                            body={
                                paymentOption ? (
                                    <div className="flex flex-col gap-4  sm:pl-12">
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                className="h-4 w-4 cursor-pointer bg-red-700"
                                                onChange={(e) =>
                                                    setSelectPaymentOption(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="cod"
                                                className="text-gray-800 sm:text-base text-sm"
                                            >
                                                Cash on Delivery
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-4 w-full">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="online"
                                                className="h-4 w-4 cursor-pointer"
                                                onChange={(e) =>
                                                    setSelectPaymentOption(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="online"
                                                className="flex w-full items-center gap-2 text-gray-800 sm:text-base text-sm"
                                            >
                                                <p>Online payment</p>
                                                (
                                                <img
                                                    src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/razorpay-icon.svg?updatedAt=1683123633492"
                                                    alt="razorpay icon"
                                                    className="h-3 sm:h-4"
                                                />
                                                )
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="wallet"
                                                className="h-4 w-4 cursor-pointer"
                                                onChange={(e) =>
                                                    setSelectPaymentOption(
                                                        e.target.value
                                                    )
                                                }
                                                disabled
                                            />
                                            <label
                                                htmlFor="wallet"
                                                className="text-gray-500 sm:text-base text-sm"
                                            >
                                                Wallet{" "}
                                                <span className="font-light text-gray-500">
                                                    (Coming Soon)
                                                </span>
                                            </label>
                                        </div>
                                        {selectPaymentOption !== "" && (
                                            <Button handleClick={confirmOrder}>
                                                {selectPaymentOption === "cod"
                                                    ? "Place order"
                                                    : "Proceed to payment"}
                                            </Button>
                                        )}
                                    </div>
                                ) : null
                            }
                        />
                    </div>
                    <div
                        className={`${
                            !isAuthenticated ? "hidden" : "flex-[0.5]"
                        } bg-white h-max shadow-md rounded-md`}
                    >
                        <h1 className="uppercase font-medium tracking-wide text-golden w-full border-b-2 border-golden border-dashed px-4 py-2">
                            Price Details
                        </h1>
                        <div className="flex flex-col gap-2 border-b-[1px] p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Price ({cart?.items?.length})
                                </span>
                                <span className="text-gray-700 font-normal">
                                    ₹{totalPrice?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                    Delivery Charge
                                </span>
                                <span className="text-gray-700 font-normal">
                                    ₹{shipping?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tax</span>
                                <span className="text-gray-700 font-normal">
                                    ₹{tax?.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border-b-[1px]">
                            <span className="text-base sm:text-lg font-medium text-gray-800">
                                Total Payable:
                            </span>
                            <span className="text-red-600 font-medium text-base sm:text-lg">
                                ₹{total}
                            </span>
                        </div>
                        {shipping === 0 && (
                            <div className="flex justify-between items-center p-4 text-green-600 font-medium sm:text-base text-sm">
                                *Your total savings in this order is ₹
                                {cart.discountAmount}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <HomeFooter />
        </>
    );
};

export default CheckOut;
