import {
    ADD_NEW_ADDRESS_FAIL,
    ADD_NEW_ADDRESS_REQUEST,
    ADD_NEW_ADDRESS_RESET,
    ADD_NEW_ADDRESS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_ADDRESS_FAIL,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_RESET,
    DELETE_ADDRESS_SUCCESS,
    GET_ALL_ADDRESS_FAIL,
    GET_ALL_ADDRESS_REQUEST,
    GET_ALL_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_RESET,
    UPDATE_ADDRESS_SUCCESS,
} from "../constants/addressConstant";

export const newAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case ADD_NEW_ADDRESS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message,
            };
        case ADD_NEW_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ADD_NEW_ADDRESS_RESET:
            return {
                ...state,
                success: false,
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

export const myAddressReducer = (state = { addresses: [] }, action) => {
    switch (action.type) {
        case GET_ALL_ADDRESS_REQUEST:
            return {
                loading: true,
                addresses: [],
            };
        case GET_ALL_ADDRESS_SUCCESS:
            return {
                loading: false,
                addresses: action.payload.addresses,
            };
        case GET_ALL_ADDRESS_FAIL:
            return {
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

export const deleteAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case DELETE_ADDRESS_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case DELETE_ADDRESS_RESET:
            return {
                loading: false,
                isDeleted: false,
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

export const updateAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADDRESS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case UPDATE_ADDRESS_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case UPDATE_ADDRESS_RESET:
            return {
                ...state,
                isUpdated: false,
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
