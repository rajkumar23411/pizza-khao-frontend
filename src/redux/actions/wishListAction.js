import axios from "axios";
import {
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_REQUEST,
    REMOVE_FROM_WISHLIST_SUCCESS,
} from "../constants/wishListConstant";

export const addToWishlist = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_WISHLIST_REQUEST });
        const { data } = await axios.post(`/api/wishlist/add/${id}`);
        dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const removeFromWishlist = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
        const { data } = await axios.post(`/api/wishlist/remove/${id}`);
        dispatch({
            type: REMOVE_FROM_WISHLIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getWishlist = () => async (dispatch) => {
    try {
        dispatch({ type: GET_WISHLIST_REQUEST });

        const { data } = await axios.get(`/api/my-wishlist`);

        dispatch({ type: GET_WISHLIST_SUCCESS, payload: data.wishlist });
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
};
