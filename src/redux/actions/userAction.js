import axios from "axios";
import { baseUrl, config } from "../../utils";
import {
  CLEAR_ERRORS,
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
axios.defaults.withCredentials = true;
export const login = (contact, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `/api/login`,
      { contact, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register =
  (firstname, lastname, contact, email, password) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const { data } = await axios.post(
        `/api/register`,
        { firstname, lastname, password, email, contact },
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const { data } = await axios.get(`/api/me`, {
      withCredentials: true,
    });

    dispatch({ type: USER_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL, payload: error.response.data.message });
  }
};
export const updateName = (firstname, lastname) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_NAME_REQUEST });
    const { data } = await axios.post(
      `/api/update/name`,
      { firstname, lastname },
      config
    );
    dispatch({ type: UPDATE_USER_NAME_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_NAME_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const verifyLoginOtp = (contact, otp) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USING_OTP_REQUEST });
    const { data } = await axios.post(
      `/api/verify/login/otp`,
      { contact, otp },
      config
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
      `/api/reset/password`,
      { contact, password },
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
