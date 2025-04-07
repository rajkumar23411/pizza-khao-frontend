import { apiConfig, baseUrl } from "../../utils/index";
import axios from "axios";
import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    SINGLE_ORDER_REQUEST,
    SINGLE_ORDER_SUCCESS,
    SINGLE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
} from "../constants/orderConstant";

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST });

        const { data } = await axios.post(
            `${baseUrl}/order/create`,
            order,
            apiConfig
        );

        dispatch({ type: NEW_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get(`${baseUrl}/my/orders`, apiConfig);
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// admin get all orders
export const getAllOrdersAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });
        const { data } = await axios.get(`${baseUrl}/admin/orders`, apiConfig);
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getSingleOrderAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ORDER_REQUEST });
        const { data } = await axios.get(
            `${baseUrl}/admin/order/${id}`,
            apiConfig
        );
        dispatch({ type: SINGLE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SINGLE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/admin/order/delete`,
            {
                id,
            },
            apiConfig
        );
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateOrderStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/order/update/${id}`,
            {
                status,
            },
            apiConfig
        );
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
