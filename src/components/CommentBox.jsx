import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Rating } from "@mui/material";
import toaster from "react-hot-toast";
import {
  addNewReview,
  clearError,
  getProductDetails,
  getProductReviews,
} from "../redux/actions/productAction";
import { ADD_REVIEW_RESET } from "../redux/constants/productConstant";

const CommentBox = ({ onClose, pizza }) => {
  const { success, error } = useSelector((state) => state.addReview);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewReview(pizza._id, Number(rating), comment));
  };

  useEffect(() => {
    if (error) {
      toaster.error(error);
      dispatch(clearError());
    }

    if (success) {
      toaster.success("Your review is submitted");
      onClose();
      dispatch({ type: ADD_REVIEW_RESET });
      dispatch(getProductDetails(pizza._id));
      dispatch(getProductReviews(pizza._id));
    }
  }, [dispatch, error, toaster, success, pizza]);
  return (
    <div
      className={`h-screen w-full fixed top-0 left-0 right-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50`}
    >
      <div className="flex bg-white rounded-md relative overflow-hidden p-5 sm:p-10 shadow-lg flex-col w-80 sm:w-max">
        <div>
          <h1 className="text-golden uppercase font-medium text-base sm:text-lg tracking-wide text-center">
            Add your review
          </h1>
          <p className="w-full text-center text-gray-800 font-light text-sm sm:text-base">
            Share your valuable feedback with us!
          </p>
        </div>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={reviewSubmitHandler}
        >
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm sm:text-base font-light">
              Your rating*
            </label>
            <span>
              <Rating
                value={rating}
                size="large"
                name="rating"
                onChange={(e) => setRating(e.target.value)}
                className="text-red-600"
              />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 text-sm sm:text-base font-light">
              Your review*
            </label>
            <textarea
              id=""
              cols="50"
              rows="3"
              className="border-[1px] resize-none border-gray-400 rounded pl-1 bg-transparent focus:border-blue-400 text-gray-800 font-light"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <p className="text-xs font-light">
              Your personal informations will not be published. Required fields
              are marked *
            </p>
          </div>
          <input
            type="submit"
            value="Submit"
            className="bg-red-500 py-3 uppercase font-normal tracking-widest text-white cursor-pointer hover:bg-red-700 rounded text-sm"
          />
        </form>
        <CloseIcon
          className="absolute right-3 top-3 text-gray-400 hover:text-red-600 cursor-pointer"
          fontSize="large"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default CommentBox;
