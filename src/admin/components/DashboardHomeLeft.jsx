import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import ReportBox from "./ReportBox";
import DataFormHeader from "./DataFormHeader";
import OrderTableData from "./OrderTableData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Categories } from "./../../utils/index";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);
const DashboardHomeLeft = () => {
  const { orders, totalOrders, totalOrderAmount, totalItemSold } = useSelector(
    (state) => state.adminOrder
  );
  const { products, productsCount } = useSelector((state) => state.products);
  const { usersCount } = useSelector((state) => state.userAdmin);

  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const lineData = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: `Sales in ${date.getFullYear()}`,
        borderColor: "rgba(241, 196, 15,1.0)",
        backgroundColor: "rgba(241, 196, 15,0.5)",
        borderWidth: 2,
        data: months.map((mo, i) =>
          orders
            ?.filter(
              (or) =>
                new Date(or.orderedAt).getMonth() === i &&
                new Date(or.orderedAt).getFullYear() === date.getFullYear()
            )
            .reduce((acc, or) => acc + or.totalAmount, 0)
        ),
      },
    ],
  };
  const barState = {
    labels: Categories,
    datasets: [
      {
        label: "Products",
        borderColor: "#9333ea",
        backgroundColor: "rgba(231, 76, 60,1.0)",
        hoverBackgroundColor: "#c0392b",
        data: Categories.map(
          (c) => products?.filter((item) => item.category.includes(c)).length
        ),
      },
    ],
  };
  const status = ["Placed", "Preparing", "Out of Delivery", "Delivered"];
  const pieState = {
    labels: status,
    datasets: [
      {
        backgroundColor: [
          "#e67e22",
          "#f1c40f",
          "#3498db",
          "#e74c3c",
          "#2ecc71",
        ],
        hoverBackgroundColor: [
          "#d35400",
          "#f39c12",
          "#3498db",
          "#c0392b",
          "#27ae60",
        ],
        data: status.map(
          (status) =>
            orders &&
            orders.filter(
              (item) =>
                item.orderStatus.toLowerCase().trim() ===
                status.toLowerCase().trim()
            ).length
        ),
      },
    ],
  };
  return (
    <section className="flex flex-col gap-5 flex-1 p-4">
      <section className="flex flex-col gap-5">
        <DashboardSectionHeader title="General Report" />
        <div className="grid grid-cols-4 gap-y-4">
          <ReportBox
            title={"Item sales"}
            icon="fal fa-chart-line text-yellow-500"
            data={totalOrderAmount}
          />
          <ReportBox
            title={"Total orders"}
            icon="fal fa-shopping-cart text-green-500"
            data={totalOrders}
          />
          <ReportBox
            title={"Products"}
            icon="far fa-cubes text-red-500"
            data={productsCount}
          />
          <ReportBox
            title={"Total Users"}
            icon="fal fa-users text-green-500"
            data={usersCount}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <DashboardSectionHeader title="Sales Report" />
        <div className="flex flex-col gap-5">
          <div className="flex-1 bg-white rounded-lg drop-shadow-md p-6">
            <Line data={lineData} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <DashboardSectionHeader title="Category wise products" />
        <div className="flex flex-col gap-5">
          <div className="flex-1 bg-white rounded-lg drop-shadow-md p-6">
            <Bar data={barState} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 w-full">
        <DashboardSectionHeader title="Order Status" />
        <div className="flex flex-col gap-5 h-[30rem]">
          <div className="flex-1 bg-white rounded-lg drop-shadow-md p-6 h-full w-full flex items-center justify-center">
            <Pie data={pieState} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <DashboardSectionHeader title="Recent Orders" />
        <div className="flex flex-col gap-2">
          <DataFormHeader
            headerTitles={[
              "Name",
              "Amount",
              "Payment Status",
              "Order Status",
              "Action",
            ]}
          />
          <OrderTableData />
          <OrderTableData />
          <OrderTableData />
          <OrderTableData />
          <OrderTableData />
          <OrderTableData />
        </div>
      </section>
    </section>
  );
};

export default DashboardHomeLeft;
