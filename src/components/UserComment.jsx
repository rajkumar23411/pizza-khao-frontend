import React from "react";
import { Rating, useMediaQuery } from "@mui/material";
import moment from "moment";

const UserComment = ({ review }) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const options = {
    value: review.rating,
    size: "small",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="flex gap-4 justify-start items-start">
      <div className="bg-green-400 h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden">
        <img
          src="https://secure.gravatar.com/avatar/a378400ca7b28bd69b381af664cc41c1?s=60&d=mm&r=g"
          alt="avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-start">
        <div>
          <Rating
            {...options}
            className="text-red-600"
            size={isSmallScreen ? "small" : "medium"}
          />
        </div>
        <div className="flex gap-1 items-center justify-center">
          <span className="uppercase font-medium text-golden text-xs sm:text-sm tracking-wide">
            {review.name}
          </span>
          <span className="text-gray-600 font-normal text-xs">
            - {moment(review.addedAt).format("Do MMMM YYYY, h:mm a")}
          </span>
        </div>
        <div className="text-gray-700 pt-1 font-light text-sm sm:text-base">
          {review.comment}
        </div>
      </div>
    </div>
  );
};

export default UserComment;
