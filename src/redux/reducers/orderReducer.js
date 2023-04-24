import {
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  NEW_ORDER_RESET,
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
