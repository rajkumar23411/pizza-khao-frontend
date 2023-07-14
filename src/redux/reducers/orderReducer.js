import {
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  NEW_ORDER_RESET,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  ADMIN_ORDER_RESET,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
} from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
        success: action.payload.success,
      };
    case NEW_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_ORDER_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
    case SINGLE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.order,
        totalOrders: action.payload.totalOrders,
        totalOrderAmount: action.payload.totalAmount,
        totalItemSold: action.payload.totalItemSold,
      };
    case SINGLE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case ALL_ORDERS_FAIL:
    case SINGLE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ORDER_RESET:
      return {
        ...state,
        success: false,
        message: null,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
