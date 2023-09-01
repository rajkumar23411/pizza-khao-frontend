import React from "react";
import { Rating, useMediaQuery } from "@mui/material";
import { getDate } from "../utils/index";
const UserFeedbackDisplay = ({ feedback }) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="w-full px-6 md:px-0 md:w-[80%] text-center text-sm md:text-lg text-gray-800 font-light md:font-normal">
        {feedback.comment}
      </p>
      <Rating
        name="half-rating"
        precision={0.5}
        size={isSmallScreen ? "small" : "large"}
        value={feedback.rating}
        readOnly
        className="text-red-600"
      />
      <p className="uppercase text-red-600 text-xs md:text-base pt-2 md:pt-4">
        {feedback.firstname + feedback.lastname} - {getDate(feedback.createdAt)}
      </p>
    </div>
  );
};

export default UserFeedbackDisplay;
