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
import { apiConfig, baseUrl } from "../../utils";
export const addNewCoupon = (coupon) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEW_COUPON_REQUEST });

        const { data } = await axios.post(
            `${baseUrl}/coupon/create`,
            coupon,
            apiConfig
        );

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
                `${baseUrl}/coupon/all?keyword=${keyword}`,
                apiConfig
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
        const res = await axios.post(
            `${baseUrl}/coupon/update/${id}`,
            data,
            apiConfig
        );
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
        const { data } = await axios.delete(
            `${baseUrl}/coupon/delete/${id}`,
            apiConfig
        );
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
        const { data } = await axios.post(
            `${baseUrl}/coupon/status/${id}`,
            {
                status,
            },
            apiConfig
        );
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
        const { data } = await axios.post(
            `${baseUrl}/coupon/validate`,
            {
                code,
            },
            apiConfig
        );
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
        const { data } = await axios.post(
            `${baseUrl}/coupon/remove`,
            apiConfig
        );
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
