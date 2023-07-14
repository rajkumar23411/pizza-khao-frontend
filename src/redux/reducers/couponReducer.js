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
  RESET_COUPON,
  UPDATE_COUPON_FAIL,
  UPDATE_COUPON_REQUEST,
  UPDATE_COUPON_SUCCESS,
} from "../constants/couponConstant";

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_COUPON_REQUEST:
    case DELETE_COUPON_REQUEST:
    case UPDATE_COUPON_REQUEST:
    case GET_ALL_COUPONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_COUPON_SUCCESS:
    case DELETE_COUPON_SUCCESS:
    case UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.msg,
      };
    case GET_ALL_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        coupons: action.payload.coupons,
        couponCounts: action.payload.couponCounts,
        activeCoupons: action.payload.activeCoupons,
      };
    case ADD_NEW_COUPON_FAIL:
    case DELETE_COUPON_FAIL:
    case UPDATE_COUPON_FAIL:
    case GET_ALL_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case RESET_COUPON:
      return {
        ...state,
        success: false,
        error: null,
        message: null,
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
