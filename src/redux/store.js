import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  profileReducer,
  userReducer,
  userReducerAdmin,
} from "./reducers/userReducer";
import {
  addReview,
  newProductReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  relatedProductReducer,
} from "./reducers/productReducer";
import {
  deleteAddressReducer,
  myAddressReducer,
  newAddressReducer,
  updateAddressReducer,
} from "./reducers/addressReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishListReducer } from "./reducers/wishlistReducer";
import {
  adminOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
} from "./reducers/orderReducer";
import { couponReducer } from "./reducers/couponReducer";
const reducer = combineReducers({
  products: productReducer,
  user: userReducer,
  userAdmin: userReducerAdmin,
  newProduct: newProductReducer,
  productDetails: productDetailsReducer,
  allReviews: productReviewsReducer,
  addReview: addReview,
  relatedProducts: relatedProductReducer,
  profile: profileReducer,
  newAddress: newAddressReducer,
  myAddresses: myAddressReducer,
  deleteAddress: deleteAddressReducer,
  updateAddress: updateAddressReducer,
  myCart: cartReducer,
  wishlist: wishListReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  adminOrder: adminOrdersReducer,
  coupon: couponReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
