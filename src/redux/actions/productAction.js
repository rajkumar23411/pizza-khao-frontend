import axios from "axios";
import { baseUrl, config } from "../../utils";
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
  CLEAR_ERRORS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  RELATED_PRODUCT_FAIL,
  RELATED_PRODUCT_REQUEST,
  RELATED_PRODUCT_SUCCESS,
} from "../constants/productConstant";

export const createProduct =
  (
    name,
    regularPrice,
    mediumPrice,
    largePrice,
    extraLargePrice,
    category,
    description,
    image
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const { data } = await axios.post(
        `/api/product/add`,
        {
          name,
          regularPrice,
          mediumPrice,
          largePrice,
          extraLargePrice,
          category,
          description,
          image,
        },
        config
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

export const getAllProducts =
  (keyword = "", price = [0, 1000]) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let Link = `/api/products?keyword=${keyword}}`;
      if (price) {
        Link = `/api/products?keyword=${keyword}&prices.regular[gte]=${price[0]}&prices.regular[lte]=${price[1]}`;
      }
      const { data } = await axios.get(Link, config);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/pizza/${id}`);

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

    const { data } = await axios.get(`/api/reviews?id=${id}`);

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
      `/api/product/add/review`,
      { id, rating, comment },
      config
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

    const { data } = await axios.get(`/api/products/related/${id}`);

    dispatch({ type: RELATED_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RELATED_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
