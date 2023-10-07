import {
    ADD_TO_CART_FAIL,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_RESET,
    ADD_TO_CART_SUCCESS,
    CLEAR_ERRORS,
    GET_CART_ITEMS_FAIL,
    GET_CART_ITEMS_REQUEST,
    GET_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_RESET,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_FAIL,
    UPDATE_CART_REQUEST,
    UPDATE_CART_RESET,
    UPDATE_CART_SUCCESS,
} from "../constants/cartConstant";

export const cartReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case UPDATE_CART_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case ADD_TO_CART_SUCCESS:
        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload.cart,
                success: action.payload.success,
            };
        case ADD_TO_CART_FAIL:
        case UPDATE_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TO_CART_RESET:
        case UPDATE_CART_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            };
        case GET_CART_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
            };
        case GET_CART_ITEMS_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case REMOVE_CART_ITEM_RESET:
            return {
                ...state,
                loading: false,
                message: null,
            };
        case REMOVE_CART_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
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
