import {
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_RESET,
    ADD_REVIEW_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_RESET,
    ALL_PRODUCT_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    CATEGORY_PRODUCT_FAIL,
    CATEGORY_PRODUCT_REQUEST,
    CATEGORY_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    RELATED_PRODUCT_FAIL,
    RELATED_PRODUCT_REQUEST,
    RELATED_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case CATEGORY_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
                isUpdated: false,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message,
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.totalProducts,
                filteredProductsCount: action.payload.filteredProductsCount,
                perPageProductCount: action.payload.perPageProductCount,
            };
        case CATEGORY_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            };

        case ALL_PRODUCT_FAIL:
        case CATEGORY_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
                message: null,
            };
        case ALL_PRODUCT_RESET:
            return {
                ...state,
                products: action.payload,
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

export const newProductReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload.createdProduct,
            };
        case NEW_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            };
        case PRODUCT_DETAILS_FAIL:
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };
        case ALL_REVIEW_FAIL:
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

export const addReview = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case ADD_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case ADD_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ADD_REVIEW_RESET:
            return {
                ...state,
                loading: false,
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

export const relatedProductReducer = (
    state = { relatedProducts: [] },
    action
) => {
    switch (action.type) {
        case RELATED_PRODUCT_REQUEST:
            return {
                loading: true,
                relatedProducts: [],
            };
        case RELATED_PRODUCT_SUCCESS:
            return {
                loading: false,
                relatedProducts: action.payload.relatedProducts,
            };
        case RELATED_PRODUCT_FAIL:
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
