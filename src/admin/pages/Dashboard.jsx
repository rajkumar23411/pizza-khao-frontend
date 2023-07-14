import React from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import "../Dashboard.css";
import DashBoardHome from "../components/DashBoardHome";
import { useDispatch } from "react-redux";
import { getAllOrdersAdmin } from "../../redux/actions/orderAction";
import { getAllProducts } from "../../redux/actions/productAction";
import { getAllUsers } from "../../redux/actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllOrdersAdmin());
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <section className="flex">
      <DashboardNavBar />
      <DashBoardHome />
    </section>
  );
};

export default Dashboard;
