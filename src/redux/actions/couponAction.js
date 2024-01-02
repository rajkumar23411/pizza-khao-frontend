import axios from "axios";
import {
    ADD_NEW_COUPON_FAIL,
    ADD_NEW_COUPON_REQUEST,
    ADD_NEW_COUPON_SUCCESS,
    CLEAR_ERRORS,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_REQUEST,
    DELETE_COUPON_SUCCESS,
    GET_ALL_COUPONS_FAIL,
    GET_ALL_COUPONS_REQUEST,
    GET_ALL_COUPONS_SUCCESS,
    REMOVE_COUPON_FAIL,
    REMOVE_COUPON_REQUEST,
    REMOVE_COUPON_SUCCESS,
    UPDATE_COUPON_FAIL,
    UPDATE_COUPON_REQUEST,
    UPDATE_COUPON_SUCCESS,
    VALIDATE_COUPON_FAIL,
    VALIDATE_COUPON_REQUEST,
    VALIDATE_COUPON_SUCCESS,
} from "../constants/couponConstant";
import { config } from "../../utils";
export const addNewCoupon = (coupon) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEW_COUPON_REQUEST });

        const { data } = await axios.post(`/api/coupon/create`, coupon, config);

        dispatch({ type: ADD_NEW_COUPON_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_NEW_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getCoupons =
    (keyword = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_COUPONS_REQUEST });

            const { data } = await axios.get(
                `/api/coupon/all?keyword=${keyword}`
            );

            dispatch({ type: GET_ALL_COUPONS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: GET_ALL_COUPONS_FAIL,
                payload: error.response.data.message,
            });
        }
    };
export const updateCoupon = (id, data) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COUPON_REQUEST });
        const res = await axios.post(`/api/coupon/update/${id}`, data, config);
        dispatch({ type: UPDATE_COUPON_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
            type: UPDATE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteCoupon = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COUPON_REQUEST });
        const { data } = await axios.delete(`/api/coupon/delete/${id}`);
        dispatch({ type: DELETE_COUPON_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const changeStatus = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COUPON_REQUEST });
        const { data } = await axios.post(`/api/coupon/status/${id}`, {
            status,
        });
        dispatch({ type: UPDATE_COUPON_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const validateCoupon = (code) => async (dispatch) => {
    try {
        dispatch({ type: VALIDATE_COUPON_REQUEST });
        const { data } = await axios.post(`/api/coupon/validate`, { code });
        dispatch({ type: VALIDATE_COUPON_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: VALIDATE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const removeCoupon = () => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_COUPON_REQUEST });
        const { data } = await axios.post(`/api/coupon/remove`);
        dispatch({ type: REMOVE_COUPON_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REMOVE_COUPON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
