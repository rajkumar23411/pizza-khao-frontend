import { REMOVE_CART_ITEM_FAIL } from "../constants/cartConstant";
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
    REMOVE_COUPON_REQUEST,
    REMOVE_COUPON_SUCCESS,
    RESET_COUPON,
    UPDATE_COUPON_FAIL,
    UPDATE_COUPON_REQUEST,
    UPDATE_COUPON_SUCCESS,
    VALIDATE_COUPON_FAIL,
    VALIDATE_COUPON_REQUEST,
    VALIDATE_COUPON_SUCCESS,
} from "../constants/couponConstant";

export const couponReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_COUPON_REQUEST:
        case DELETE_COUPON_REQUEST:
        case UPDATE_COUPON_REQUEST:
        case GET_ALL_COUPONS_REQUEST:
        case VALIDATE_COUPON_REQUEST:
        case REMOVE_COUPON_REQUEST:
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
        case VALIDATE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                isValidate: action.payload.success,
            };
        case GET_ALL_COUPONS_SUCCESS:
            return {
                ...state,
                loading: false,
                coupons: action.payload.coupons,
                couponCounts: action.payload.couponCounts,
                activeCoupons: action.payload.activeCoupons,
            };
        case REMOVE_COUPON_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.msg,
            };
        case ADD_NEW_COUPON_FAIL:
        case DELETE_COUPON_FAIL:
        case UPDATE_COUPON_FAIL:
        case GET_ALL_COUPONS_FAIL:
        case REMOVE_CART_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case VALIDATE_COUPON_FAIL:
            return {
                ...state,
                loading: false,
                isValidate: false,
                error: action.payload,
            };
        case RESET_COUPON:
            return {
                ...state,
                success: false,
                error: null,
                message: null,
                isValidate: null,
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
