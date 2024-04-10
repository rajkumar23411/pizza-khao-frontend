import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_RESET,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_USING_OTP_FAIL,
    LOGIN_USING_OTP_REQUEST,
    LOGIN_USING_OTP_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_NAME_FAIL,
    UPDATE_NAME_RESET,
    UPDATE_USER_NAME_REQUEST,
    UPDATE_USER_NAME_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case USER_LOAD_REQUEST:
        case LOGIN_USING_OTP_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case USER_LOAD_SUCCESS:
        case LOGIN_USING_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                success: action.payload.success,
                user: action.payload.user,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case RESET_PASSWORD_FAIL:
        case LOGIN_USING_OTP_FAIL:
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                success: false,
                error: action.payload,
            };
        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        case USER_LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_NAME_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_NAME_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_NAME_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case UPDATE_NAME_RESET:
            return {
                ...state,
                loading: false,
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

export const userReducerAdmin = (state = {}, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                usersCount: action.payload.usersCount,
            };
        case ALL_USERS_FAIL:
            return {
                loading: false,
                ...state,
            };
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default:
            return state;
    }
};
