import React, { useEffect } from "react";
import MainNav from "../components/MainNav";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getCartItems } from "../redux/actions/cartActions";
import HomeFooter from "../components/HomeFooter";
import { useSnackbar } from "notistack";
import {
  REMOVE_CART_ITEM_RESET,
  UPDATE_CART_RESET,
} from "../redux/constants/cartConstant";
import { RESET_ADD_TO_FAVOURITE } from "../redux/constants/wishListConstant";
import { getWishlist } from "../redux/actions/wishListAction";
import PageHead from "../components/PageHead";
import Loader from "../components/Loader";

const Cart = () => {
  const { loading, cart, error, success, message } = useSelector(
    (state) => state.myCart
  );
  const { wishlist, message: wishListMessage } = useSelector(
    (state) => state.wishlist
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (wishListMessage) {
      enqueueSnackbar(wishListMessage, { variant: "success" });
      dispatch({ type: RESET_ADD_TO_FAVOURITE });
    }
    dispatch(getWishlist());
  }, [wishListMessage, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      clearError();
    }
    if (success) {
      enqueueSnackbar("Cart updated", { variant: "success" });
      dispatch({ type: UPDATE_CART_RESET });
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }
    dispatch(getCartItems());
  }, [dispatch, error, message, wishListMessage, success, enqueueSnackbar]);

  const totalPrice = cart && cart.totalPrice;
  const tax = cart && Number((cart.totalPrice / 100) * 5);
  const shipping = cart && Number(cart.totalPrice <= 300 ? 50 : 0);
  const total = Number(totalPrice + tax + shipping).toFixed(2);
  return (
    <>
      <section>
        <MainNav />
      </section>
      <PageHead pageName={"My Cart"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {cart?.items?.length === 0 ? (
            <div className="w-full flex items-center justify-center flex-col py-20">
              <img
                src="/images/empty_cart.svg"
                alt="empty_cart"
                className="h-80"
              />
              <p className="uppercase text-golden font-medium text-3xl mt-6 tracking-wider">
                Your cart is empty
              </p>
              <p className="text-gray-600 text-lg">No items found in cart</p>
              <Link
                to="/menu"
                className="bg-red-600 font-normal text-white rounded-sm px-4 mt-6 py-2 uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700"
              >
                Update Cart
              </Link>
            </div>
          ) : (
            <>
              <section className="px-10 pt-10 flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <div className="h-12 flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="h-full border-2 border-gray-400 pl-2"
                    />
                    <span className="bg-red-600 text-white rounded-sm uppercase h-12 text-sm tracking-wider font-normal flex items-center justify-center w-max px-4 cursor-pointer hover:bg-red-700">
                      Apply Coupon
                    </span>
                  </div>
                  <span className="bg-red-600 text-white rounded-sm uppercase h-12 text-sm tracking-wider font-normal w-max flex items-center justify-center px-4 cursor-pointer hover:bg-red-700">
                    Clear cart
                  </span>
                </div>
              </section>
              <section className="flex gap-4 p-10">
                <div className="flex-1">
                  <h1 className="text-2xl uppercase font-medium text-gray-700 mb-6">
                    Cart Items ({cart && cart.items && cart.items.length})
                  </h1>
                  <div className="flex flex-col gap-6">
                    {cart?.items?.map((item, i) => (
                      <CartItem key={i} item={item} wishlist={wishlist} />
                    ))}
                  </div>
                </div>
                <div className="flex-[0.6] flex items-center flex-col h-max">
                  <div>
                    <div className="text-2xl  uppercase font-medium text-golden border-b-2 border-b-golden border-dashed">
                      Cart Total
                    </div>
                    <div className="flex gap-20 py-10">
                      <div className="flex flex-col gap-4">
                        <div className="text-lg capitalize text-gray-500">
                          Subtotal
                        </div>
                        <div className="text-lg capitalize text-gray-500">
                          Shipping
                        </div>
                        <div className="text-lg capitalize text-gray-500">
                          Tax
                        </div>
                        <div className="text-lg uppercase font-bold text-red-600">
                          Total
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="text-lg text-gray-700">
                          ₹
                          {cart &&
                            cart.totalPrice &&
                            cart.totalPrice.toFixed(2)}
                        </div>
                        {shipping === 0 ? (
                          <div className="text-lg text-gray-700 flex items-center justify-center gap-2">
                            <span className="line-through text-gray-700">
                              ₹50
                            </span>
                            <span className="text-green-600 text-sm font-normal">
                              Free Shipping
                            </span>
                          </div>
                        ) : (
                          <div className="text-lg text-gray-700">
                            ₹{shipping}
                          </div>
                        )}
                        <div className="text-lg text-gray-700">
                          ₹{cart && tax.toFixed(2)}
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          ₹{total}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/checkout"
                        className="bg-red-600 text-center text-white rounded-sm py-3 uppercase font-normal text-sm tracking-wider hover:bg-red-700 cursor-pointer"
                      >
                        Proceed to checkout
                      </Link>
                      <Link
                        to="/menu"
                        className="text-center text-gray-600 rounded-sm py-3 uppercase font-normal text-sm tracking-wider border-2 border-gray-300 hover:text-gray-700 hover:border-gray-700 cursor-pointer"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
          <HomeFooter />
        </>
      )}
    </>
  );
};

export default Cart;
