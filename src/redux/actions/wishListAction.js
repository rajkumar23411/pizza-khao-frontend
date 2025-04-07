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
import { apiConfig, baseUrl } from "../../utils";
export const addToWishlist = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_WISHLIST_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/wishlist/add/${id}`,
            apiConfig
        );
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
        const { data } = await axios.post(
            `${baseUrl}/wishlist/remove/${id}`,
            apiConfig
        );
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

        const { data } = await axios.get(`${baseUrl}/my-wishlist`, apiConfig);

        dispatch({ type: GET_WISHLIST_SUCCESS, payload: data.wishlist });
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_FAIL,
            payload: error.response.data.message,
        });
    }
};
