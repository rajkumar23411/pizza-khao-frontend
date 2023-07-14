import React from "react";
import PageHeader from "./PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteOrder,
  getSingleOrderAdmin,
  updateOrderStatus,
} from "../../redux/actions/orderAction";
import toaster from "react-hot-toast";
import DashboardSectionHeader from "./DashboardSectionHeader";
import DataFormHeader from "./DataFormHeader";
import { ADMIN_ORDER_RESET } from "../../redux/constants/orderConstant";
const PlaceHolderCard = ({ height }) => {
  return (
    <div
      data-placeholder
      className={`w-full ${height} overflow-hidden relative bg-gray-200 rounded drop-shadow-md`}
    ></div>
  );
};

const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = React.useState("");
  const { success, order, error, loading, message } = useSelector(
    (state) => state.adminOrder
  );

  const handleUpdateOrderStatus = () => {
    dispatch(updateOrderStatus(id, orderStatus));
  };
  const deleteOrderHandler = () => {
    dispatch(deleteOrder(id));
    navigate("/admin/dashboard/orders");
  };
  React.useEffect(() => {
    if (success) {
      toaster.success(message);
      dispatch({ type: ADMIN_ORDER_RESET });
    }
    if (error) {
      toaster.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleOrderAdmin(id));
  }, [dispatch, id, error, success, message]);
  return (
    <section className="flex-1 bg-gray-100">
      <PageHeader pagetitle={"Order"} />
      <section className="flex p-4 items-start gap-10">
        <section className="flex-1 flex flex-col gap-6">
          <section className="flex flex-col gap-4">
            <DashboardSectionHeader title={"Customer Details"} />
            {loading ? (
              <PlaceHolderCard height={"h-28"} />
            ) : (
              <div className="bg-white drop-shadow-md p-4 flex flex-col gap-1 rounded">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Username:</span>
                  <span className="capitalize">
                    {order?.userId.firstname + " " + order?.userId.lastname}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{order?.userId.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Contact:</span>
                  <span>{order?.userId.contact}</span>
                </div>
              </div>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <DashboardSectionHeader title={"Shipping Info"} />
            {loading ? (
              <PlaceHolderCard height={"h-56"} />
            ) : (
              <div className="bg-white drop-shadow-md p-6 flex flex-col gap-1 rounded">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Name:</span>
                  <span>{order?.addressId?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Contact:</span>
                  <span>{order?.addressId?.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">
                    Alternate Contact:
                  </span>
                  <span>{order?.addressId?.alternateContact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Pin code:</span>
                  <span>{order?.addressId?.pinCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Address:</span>
                  <span>{order?.addressId?.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Locality:</span>
                  <span>{order?.addressId?.locality}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">City:</span>
                  <span>{order?.addressId?.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">State:</span>
                  <span>{order?.addressId?.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">Landmark:</span>
                  <span>{order?.addressId?.landMark}</span>
                </div>
              </div>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <DashboardSectionHeader title={"Action"} />
            {loading ? (
              <PlaceHolderCard height={"h-28"} />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <span className="font-medium uppercase text-golden">
                    order status:
                  </span>
                  <span className="font-roboto">{order?.orderStatus}</span>
                </div>
                {order?.orderStatus === "Delivered" && (
                  <div className="flex gap-2">
                    <span className="font-medium uppercase text-golden">
                      Delivered on:
                    </span>
                    <span className="font-roboto">
                      {new Date(order?.deliveredAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      at{" "}
                      {new Date(order?.deliveredAt).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {order?.orderStatus !== "Delivered" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <select
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="font-roboto bg-transparent border-2 border-gray-400 px-4 py-3 rounded-2xl cursor-pointer text-lg"
                      >
                        <option disabled defaultValue selected value="">
                          Choose order status
                        </option>
                        {order?.orderStatus === "Placed" && (
                          <option value="Preparing">Preparing</option>
                        )}
                        {order?.orderStatus === "Preparing" && (
                          <option value="Out of delivery">
                            Out of delivery
                          </option>
                        )}
                        {order?.orderStatus === "Out of delivery" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                      <button
                        disabled={orderStatus === "" ? true : false}
                        onClick={handleUpdateOrderStatus}
                        className="border-2 bg-purple-600 uppercase px-6 py-3 rounded-3xl tracking-wide text-white hover:bg-purple-700 hover:drop-shadow-md"
                      >
                        Update Status
                      </button>
                    </div>
                    <div onClick={deleteOrderHandler}>
                      <button className="border-2 bg-red-600 uppercase px-6 py-3 rounded-3xl tracking-wide text-white hover:bg-red-700 hover:drop-shadow-md">
                        Delete Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </section>
        <section className="flex-1 flex flex-col gap-6">
          <section className="flex flex-col gap-4">
            <DashboardSectionHeader title={"Order Details"} />
            {loading ? (
              <PlaceHolderCard height={"h-28"} />
            ) : (
              <div className="flex flex-col gap-2">
                <DataFormHeader
                  headerTitles={[
                    "Product Name",
                    "Quantity",
                    "Size",
                    "Unit Price",
                    "Total",
                  ]}
                />
                {order?.items?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white drop-shadow-md flex justify-between items-center py-4 rounded"
                  >
                    <div className="flex-1 text-center capitalize">
                      {item.productId.name}
                    </div>
                    <div className="flex-1 text-center">{item.quantity}</div>
                    <div className="flex-1 text-center capitalize">
                      {item.size}
                    </div>
                    <div className="flex-1 text-center">
                      ₹{item.productId.prices[item.size].toFixed(2)}
                    </div>
                    <div className="flex-1 text-center">
                      ₹
                      {(
                        item.quantity * item.productId.prices[item.size]
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <DashboardSectionHeader title={"Payment Info"} />
            {loading ? (
              <PlaceHolderCard height={"h-40"} />
            ) : (
              <div className="bg-white drop-shadow-md rounded p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between text-lg">
                  <span>Subtotal</span>
                  <span>₹{order?.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span>Delivery Charge</span>
                  <span>₹{order?.deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span>Tax</span>
                  <span>₹{order?.tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg border-t-2 border-golden border-dashed">
                  <span className="uppercase font-medium text-lg">Total</span>
                  <span className="font-medium">
                    ₹{order?.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
            {loading ? (
              <PlaceHolderCard height={"h-48"} />
            ) : (
              <div className="bg-white drop-shadow-md rounded p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Payment Mode</span>
                  <span
                    className={`flex items-center justify-center gap-1 ${
                      order?.paymentMode === "cod" ? "uppercase" : "capitalize"
                    }`}
                  >
                    <span>{order?.paymentMode}</span>
                    {order?.paymentMode === "cod" && (
                      <i className="fad fa-sack-dollar"></i>
                    )}
                  </span>
                </div>
                {order?.paymentMode === "online" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Transaction ID</span>
                      <span>{order?.paymentInfo.transactionId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Payment Gateway</span>
                      <img
                        src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/razorpay-icon.svg?updatedAt=1683123633492"
                        alt="razor pay logo"
                        className="h-4"
                      ></img>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Transaction Status</span>
                      <span className="flex items-center justify-center gap-1">
                        <span>{order?.paymentInfo.transactionStatus}</span>
                        <span className="fad fa-badge-check text-green-700"></span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg">Paid on</span>
                      <span>
                        {new Date(order?.paymentInfo.paidAt).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};

export default SingleOrder;
