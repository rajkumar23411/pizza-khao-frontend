import { ADD_TO_CART_RESET } from "../constants/cartConstant";
import {
  ADD_TO_FAVORUITE_FAIL,
  ADD_TO_FAVORUITE_REQUEST,
  ADD_TO_FAVORUITE_SUCCESS,
  CLEAR_ERRORS,
  GET_FAVORUITE_FAIL,
  GET_FAVORUITE_REQUEST,
  GET_FAVORUITE_SUCCESS,
  RESET_ADD_TO_FAVOURITE,
} from "../constants/wishListConstant";

export const wishListReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_FAVORUITE_REQUEST:
      return {
        ...state,
        message: null,
      };
    case ADD_TO_FAVORUITE_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case ADD_TO_FAVORUITE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_ADD_TO_FAVOURITE:
      return {
        ...state,
        message: null,
      };
    case GET_FAVORUITE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_FAVORUITE_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };

    case GET_FAVORUITE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
