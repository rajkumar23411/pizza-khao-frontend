import axios from "axios";
import { apiConfig, baseUrl } from "../../utils";
import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_USING_OTP_REQUEST,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_NAME_FAIL,
    UPDATE_USER_NAME_REQUEST,
    UPDATE_USER_NAME_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
} from "../constants/userConstant";

export const login = (loginData) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post(
            `${baseUrl}/login`,
            loginData,
            apiConfig
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const { data } = await axios.post(`${baseUrl}/register`, formData);
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOAD_REQUEST });

        const { data } = await axios.get(`${baseUrl}/me`, apiConfig);

        dispatch({ type: USER_LOAD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const updateName = (firstname, lastname) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_NAME_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/update/name`,
            {
                firstname,
                lastname,
            },
            apiConfig
        );
        dispatch({ type: UPDATE_USER_NAME_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_NAME_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${baseUrl}/logout`, apiConfig);
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};
export const forgotPassword = (contact) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const { data } = await axios.post(
            `${baseUrl}/forgot/password`,
            {
                contact,
            },
            apiConfig
        );

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const verifyLoginOtp = (contact, otp) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USING_OTP_REQUEST });
        const { data } = await axios.post(
            `${baseUrl}/verify/login/otp`,
            {
                contact,
                otp,
            },
            apiConfig
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

export const resetPassword = (contact, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const { data } = await axios.post(
            `${baseUrl}/reset/password`,
            {
                contact,
                password,
            },
            apiConfig
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST,
        });
        const { data } = await axios.get(
            `${baseUrl}/admin/users/all`,
            apiConfig
        );
        dispatch({ type: ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
