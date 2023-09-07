import React from "react";
import DashboardSectionHeader from "./DashboardSectionHeader";
import PageHeader from "./PageHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import {
  clearErrors,
  deleteOrder,
  getAllOrdersAdmin,
} from "./../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import toaster from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ADMIN_ORDER_RESET } from "../../redux/constants/orderConstant";
import SearchBar from "./SearchBar";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const columns = [
  { id: "items", label: "Items", minWidth: 170, align: "left" },
  { id: "customer", label: "Customer", minWidth: 170, align: "left" },
  { id: "amount", label: "Amount", minWidth: 100, align: "left" },
  { id: "payment", label: "Payment", minWidth: 100, align: "left" },
  { id: "orderedAt", label: "Ordered At", minWidth: 170, align: "left" },
  { id: "status", label: "Status", minWidth: 170, align: "left" },
  { id: "action", label: "Action", minWidth: 80, align: "center" },
];
const DashBoardOrderDetails = () => {
  const { loading, success, error, orders, message, totalOrders } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/admin/dashboard/order/${id}`);
  };
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  React.useEffect(() => {
    if (success) {
      toaster.success(message);
      navigate("/admin/dashboard/orders");
      dispatch({ type: ADMIN_ORDER_RESET });
    }
    if (error) {
      toaster.error(message);
      dispatch(clearErrors());
    }
    dispatch(getAllOrdersAdmin());
  }, [dispatch, success, error, message, navigate]);
  return (
    <section className="flex-1 bg-slate-50 ">
      <PageHeader pagetitle={"Orders"} />
      <section className="flex flex-col gap-5 w-full p-4">
        <div className="flex items-center justify-between">
          <DashboardSectionHeader title="Recent Orders" />
          <div>
            <span>Total Orders:</span>
            <span>{totalOrders && totalOrders}</span>
          </div>
          <SearchBar />
        </div>
        {totalOrders === 0 ? (
          <div className="flex items-center justify-center flex-col gap-2">
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/20230714190159__fpdl.in__premium-flat-vector-select-food_203633-8037_large.jpg?updatedAt=1689348826936"
              alt="no orders"
              className="mix-blend-multiply h-[28rem]"
            />
            <span className="uppercase text-xl tracking-wide font-medium text-gray-700">
              No orders to shows
            </span>
          </div>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          textTransform: "uppercase",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ width: "100%" }}>
                  {loading ? (
                    <Loader />
                  ) : (
                    orders?.map((order) => (
                      <StyledTableRow key={order?._id}>
                        <StyledTableCell align="left">
                          <div className="flex flex-col gap-2">
                            {order.items.map((item, i) => (
                              <span key={i} className="font-roboto capitalize">
                                {item.productId.name} - {item.quantity} (
                                {item.size})
                              </span>
                            ))}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="left" className="capitalize">
                          {order.userId.firstname + " " + order.userId.lastname}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          ₹{order.totalAmount}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {order.paymentMode}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <span className="font-roboto">
                            {new Date(order.orderedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <br />
                          <span className="font-roboto">
                            {new Date(order.orderedAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {order?.orderStatus}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div className="flex items-center justify-center gap-2">
                            <span
                              onClick={() => handleRowClick(order?._id)}
                              className="text-blue-500 capitalize cursor-pointer font-sans text-sm font-medium hover:text-blue-600"
                            >
                              View
                            </span>
                            <button
                              onClick={() => deleteOrderHandler(order?._id)}
                              className="text-red-500 capitalize cursor-pointer font-sans text-sm font-medium hover:text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </section>
    </section>
  );
};

export default DashBoardOrderDetails;
