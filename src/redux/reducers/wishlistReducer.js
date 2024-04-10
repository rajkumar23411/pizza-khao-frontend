import {
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    CLEAR_ERRORS,
    GET_WISHLIST_FAIL,
    GET_WISHLIST_REQUEST,
    GET_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_REQUEST,
    REMOVE_FROM_WISHLIST_SUCCESS,
    RESET_WISHLIST_STATE,
} from "../constants/wishListConstant";

export const wishListReducer = (state = { wishlist: [] }, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST_REQUEST:
        case REMOVE_FROM_WISHLIST_REQUEST:
            return {
                ...state,
                message: null,
            };
        case ADD_TO_WISHLIST_SUCCESS:
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
            };
        case ADD_TO_WISHLIST_FAIL:
        case REMOVE_FROM_WISHLIST_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload,
            };
        case RESET_WISHLIST_STATE:
            return {
                ...state,
                success: null,
                message: null,
            };
        case GET_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                wishlist: action.payload,
            };

        case GET_WISHLIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                error: null,
            };
        default:
            return state;
    }
};
