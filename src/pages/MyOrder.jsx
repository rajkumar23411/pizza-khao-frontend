import React from "react";
import MainNav from "../components/MainNav";
import SingleOrderBox from "../components/SingleOrderBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { myOrders } from "../redux/actions/orderAction";
import Loader from "../components/Loader";
import PageHead from "../components/PageHead";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <section className="min-h-full w-full">
      <div>
        <MainNav />
      </div>
      <PageHead pageName={"My Orders"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="px-10 py-20 grid grid-cols-3 gap-4 w-max place-items-center justify-items-center m-auto">
          {orders?.map((order) => (
            <SingleOrderBox order={order} key={order._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrder;
