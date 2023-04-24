import axios from "axios";
import { baseUrl } from "./../../utils/index";
import {
  ADD_TO_FAVORUITE_FAIL,
  ADD_TO_FAVORUITE_REQUEST,
  ADD_TO_FAVORUITE_SUCCESS,
  GET_FAVORUITE_FAIL,
  GET_FAVORUITE_REQUEST,
  GET_FAVORUITE_SUCCESS,
} from "../constants/wishListConstant";

export const addRemoveFromWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_FAVORUITE_REQUEST });
    const { data } = await axios.post(`${baseUrl}/api/wishlist/${id}`);
    dispatch({ type: ADD_TO_FAVORUITE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: ADD_TO_FAVORUITE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FAVORUITE_REQUEST });

    const { data } = await axios.get(`${baseUrl}/api/my-wishlist`);

    dispatch({ type: GET_FAVORUITE_SUCCESS, payload: data.wishlist });
  } catch (error) {
    dispatch({
      type: GET_FAVORUITE_FAIL,
      payload: error.response.data.message,
    });
  }
};
