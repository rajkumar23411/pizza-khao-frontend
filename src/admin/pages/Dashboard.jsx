import React from "react";
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
        <section className="w-full">
            <DashBoardHome />
        </section>
    );
};

export default Dashboard;
