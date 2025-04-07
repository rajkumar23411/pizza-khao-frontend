import axios from "axios";
import { apiConfig, baseUrl } from "../../utils";
import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    CATEGORY_PRODUCT_FAIL,
    CATEGORY_PRODUCT_REQUEST,
    CATEGORY_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    RELATED_PRODUCT_FAIL,
    RELATED_PRODUCT_REQUEST,
    RELATED_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstant";

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/product/add`,
            productData,
            apiConfig
        );
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const { data } = await axios.put(
            `${baseUrl}/admin/product/update/${id}`,
            productData,
            apiConfig
        );
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`${baseUrl}/pizza/${id}`, apiConfig);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(
            `${baseUrl}/reviews?id=${id}`,
            apiConfig
        );

        dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const addNewReview = (id, rating, comment) => async (dispatch) => {
    try {
        dispatch({ type: ADD_REVIEW_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/product/add/review`,
            {
                id,
                rating,
                comment,
            },
            apiConfig
        );

        dispatch({ type: ADD_REVIEW_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getRelatedProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: RELATED_PRODUCT_REQUEST });

        const { data } = await axios.get(
            `${baseUrl}/products/related/${id}`,
            apiConfig
        );

        dispatch({ type: RELATED_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RELATED_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get all products for admin and user
export const getAllProducts =
    (
        resultPerPage,
        keyword = "",
        page = 1,
        category = "",
        sort = "",
        price = [0, 1000],
        discount = 0
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });

            let apiUrl = `${baseUrl}/products?page=${page}`;

            if (resultPerPage) apiUrl += `&limit=${resultPerPage}`;
            if (keyword) apiUrl += `&keyword=${keyword}`;
            if (category) apiUrl += `&category=${category}`;
            if (sort) apiUrl += `&sort=${sort}`;
            if (discount) apiUrl += `&discount[gte]=${discount}`;
            if (price)
                apiUrl += `&prices.regular[gte]=${price[0]}&prices.extralarge[lte]=${price[1]}`;

            const { data } = await axios.get(apiUrl, apiConfig);
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };
export const categorizedProducts = (category) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_PRODUCT_REQUEST });
        const { data } = await axios.get(
            `${baseUrl}/products/category/${category}`,
            apiConfig
        );
        dispatch({ type: CATEGORY_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CATEGORY_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// ADMIN - DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(
            `${baseUrl}/admin/product/delete?id=${id}`,
            apiConfig
        );

        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
