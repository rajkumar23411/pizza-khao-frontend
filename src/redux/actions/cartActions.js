import axios from "axios";
import { apiConfig, baseUrl } from "../../utils";
import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    CLEAR_ERRORS,
    GET_CART_ITEMS_FAIL,
    GET_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
} from "../constants/cartConstant";

export const addToCart = (productId, quantity, size) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            `${baseUrl}/add_to_cart`,
            {
                productId,
                quantity,
                size,
            },
            apiConfig
        );
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getCartItems = () => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });

        const { data } = await axios.get(`${baseUrl}/my/cart`, apiConfig);

        dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: data.cart });
    } catch (error) {
        dispatch({
            type: GET_CART_ITEMS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateCart = (id, quantity, size) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_REQUEST });
        const { data } = await axios.put(
            `${baseUrl}/cart/update`,
            {
                id,
                quantity,
                size,
            },
            apiConfig
        );
        dispatch({ type: UPDATE_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_CART_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const removeCartItem = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(
            `${baseUrl}/cart/delete/${id}`,
            apiConfig
        );

        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: REMOVE_CART_ITEM_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
