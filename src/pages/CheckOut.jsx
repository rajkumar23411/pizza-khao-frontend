import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import OrderedItems from "../components/OrderedItems";
import { useDispatch, useSelector } from "react-redux";
import CheckoutLoginForm from "../components/CheckoutLoginForm";
import { clearError, myAddresses } from "../redux/actions/addressAction";
import { Radio } from "@mui/material";
import { clearErrors, createOrder } from "../redux/actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { NEW_ORDER_RESET } from "../redux/constants/orderConstant";
import AddressForm from "./../components/AddressForm";
import { ADD_NEW_ADDRESS_RESET } from "../redux/constants/addressConstant";
import PageHead from "../components/PageHead";
import Loader from "./../components/Loader";
const CheckoutStep = (props) => {
  return (
    <div className="bg-white shadow-sm w-full">
      <div
        onClick={props.onClick}
        className={`w-full ${props.active && "bg-red-600"}`}
      >
        <div className="flex items-center gap-6 px-10 py-3 ">
          <p
            className={`h-6 w-6 flex items-center justify-center font-semibold ${
              props.active ? "text-red-700" : "text-gray-600"
            }  rounded bg-slate-100`}
          >
            {props.stepNumber}
          </p>
          <p
            className={`uppercase tracking-wider text-gray-800 font-normal ${
              props.active && "text-white"
            }`}
          >
            {props.title}
          </p>
        </div>
      </div>
      <div className={props.body && "px-10 py-3"}>
        {props.body && props.body}
      </div>
    </div>
  );
};
const Address = ({ address, confirmDeliveryAddress, selectAddress }) => {
  return (
    <div className={`flex flex-col  border-b-2 p-6`}>
      <div className="flex items-start justify-start gap-6">
        <Radio onClick={() => selectAddress(address)} />
        <div className="flex flex-col gap-4">
          <div className="flex gap-5">
            <p className="text-gray-800 font-medium">{address.name}</p>
            <p className="text-gray-800 font-medium">{address.contact}</p>
          </div>
          <div className="text-gray-600 font-normal flex items-center gap-1">
            <span>{address.locality}</span>
            <span>{address.address}</span>
            <span>{address.landMark}</span>
            <span>{address.alternateContact}</span>
            <span>
              {address.state} - {address.pinCode}
            </span>
          </div>
          {address.selected && (
            <button
              className="text-red-500 border-2 border-red-500 font-medium hover:bg-red-500 hover:text-white cursor-pointer w-max px-4 py-1 rounded-sm"
              onClick={() => confirmDeliveryAddress(address)}
            >
              Deliver here
            </button>
          )}
        </div>
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
  const { success: addAddressSuccess, error: addAddressError } = useSelector(
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
  const { enqueueSnackbar } = useSnackbar();
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
        const { data } = await axios.get("/api/getapikey");
        const {
          data: { order },
        } = await axios.post("/api/create-rzp-order", {
          amount: orderData.totalAmount,
        });
        const options = {
          key: data.key,
          amount: orderData.totalAmount * 100,
          currency: "INR",
          name: "Pizza-Khao",
          description: "Pizza-khao payment",
          order_id: order.id,
          image:
            "https://avatars.githubusercontent.com/u/90103892?s=400&u=1147637f019bbb8a63f51fed38a6f0a5e02371d2&v=4",
          handler: function (response) {
            axios
              .post("/api/verifypayment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
              .then((res) => {
                if (res.data.success === true) {
                  orderData.paymentInfo = {
                    transactionId: res.data.razorpay_payment_id,
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
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [success, error, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (addAddressSuccess) {
      setNewAddress(false);
      enqueueSnackbar("Address added successfully", { variant: "success" });
      dispatch({ type: ADD_NEW_ADDRESS_RESET });
    }
    if (addAddressError) {
      enqueueSnackbar(addAddressError, { variant: "error" });
      dispatch(clearError());
    }
    dispatch(myAddresses());
  }, [dispatch, addAddressSuccess, addAddressError, enqueueSnackbar]);

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
          <img src="/images/empty_cart.svg" alt="empty cart" className="h-60" />
          <h1 className="text-2xl font-medium mt-6 text-gray-700">
            Oops! Nothing here to checkout
          </h1>
          <p className="text-lg font-light">No item found in your cart</p>
          <Link
            to="/menu"
            className="bg-red-600 text-white px-4 py-2 rounded-sm text-lg mt-4 hover:bg-red-700"
          >
            Go to menu
          </Link>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-slate-50 py-20 px-40 flex gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <CheckoutStep
              stepNumber={1}
              title="Login"
              active={!isAuthenticated}
              body={
                userLoading ? (
                  <Loader />
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-4 font-medium pl-12 text-gray-700">
                    <span className="capitalize">
                      {user.firstname} {user.lastname}
                    </span>
                    <span>{user.contact}</span>
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
                    button={"Save and Deliver here"}
                  />
                ) : confirmAddress ? (
                  selectedAddress && (
                    <div className="flex flex-col gap-2 pl-12">
                      <p className="text-gray-700 font-semibold">
                        {selectedAddress.name} - {selectedAddress.contact}
                      </p>
                      {selectedAddress && (
                        <p className="text-gray-600">
                          {selectedAddress.locality}, {selectedAddress.address},{" "}
                          {selectedAddress.landMark},{" "}
                          {selectedAddress.alternateContact} <br />{" "}
                          {selectedAddress.state} - {selectedAddress.pinCode}
                        </p>
                      )}
                    </div>
                  )
                ) : (
                  address?.map((address) => (
                    <Address
                      address={address}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      selectAddress={selectAddress}
                    />
                  ))
                )
              }
            />
            {address?.length !== 0 &&
              (confirmAddress ? null : newAddress ? (
                <AddressForm button={"Save and Deliver here"} />
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
                      <div className="mt-4 flex items-center justify-end">
                        <button
                          className="text-white bg-green-600 font-normal tracking-wider capitalize hover:bg-green-700 cursor-pointer w-max px-4 py-2 rounded-sm"
                          onClick={proceedNext}
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  ) : null}
                  {showOrderSummary && (
                    <div className="flex-col gap-6 flex">
                      {cart.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-6 px-10"
                        >
                          <div className="h-24 w-24">
                            <img
                              src={item.product.image}
                              alt={item.product.image}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="leading-5">
                            <p className="text-gray-800 font-normal uppercase tracking-wide">
                              {item.product.name}
                            </p>
                            <p className="capitalize text-gray-600">
                              {item.size}
                            </p>
                            <p className="text-gray-600">{item.quantity}</p>
                            <p className="font-semibold text-red-600 text-lg">
                              ₹{item.quantity * item.product.prices[item.size]}
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
                  <div className="flex flex-col gap-4 pl-12">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        className="h-4 w-4 cursor-pointer bg-red-700"
                        onChange={(e) => setSelectPaymentOption(e.target.value)}
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        className="h-4 w-4 cursor-pointer"
                        onChange={(e) => setSelectPaymentOption(e.target.value)}
                      />
                      <label
                        htmlFor="online"
                        className="flex w-full items-center  gap-2"
                      >
                        <p>Online payment</p>
                        (
                        <img
                          src="/images/razorpay-icon.svg"
                          alt="razorpay icon"
                          className="h-4"
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
                        onChange={(e) => setSelectPaymentOption(e.target.value)}
                        disabled
                      />
                      <label htmlFor="wallet" className="text-gray-500">
                        Wallet{" "}
                        <span className="font-light text-gray-500">
                          (Coming Soon)
                        </span>
                      </label>
                    </div>
                    {selectPaymentOption !== "" && (
                      <button
                        className="bg-red-600 font-light text-white  py-2 rounded-sm w-max px-4 mt-4 tracking-wider hover:bg-red-700"
                        onClick={confirmOrder}
                      >
                        {selectPaymentOption === "cod"
                          ? "Place order"
                          : "Proceed to payment"}
                      </button>
                    )}
                  </div>
                ) : null
              }
            />
          </div>
          <div
            className={`${
              !isAuthenticated ? "hidden" : "flex-[0.5]"
            } bg-white h-max shadow-m`}
          >
            <h1 className="uppercase font-semibold tracking-wide text-golden w-full border-b-2 border-golden border-dashed px-4 py-2">
              Price Details
            </h1>
            <div className="flex flex-col gap-2 border-b-[1px] p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Price ({cart?.items?.length})
                </span>
                <span className="text-gray-800 font-semibold">
                  ₹{totalPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-gray-800 font-semibold">
                  ₹{shipping?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800 font-semibold">
                  ₹{tax?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border-b-[1px]">
              <span className="text-lg font-semibold text-gray-800">
                Total Payable:
              </span>
              <span className="text-red-600 font-semibold text-lg">
                ₹{total}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 text-golden font-semibold">
              *Your total savings in this order is $45.98
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;
