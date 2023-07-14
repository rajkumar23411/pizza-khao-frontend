import React, { useState } from "react";
import UserQueryContent from "./UserQueryContent";

const UserQueryBox = () => {
  const [showReply, setShowReply] = useState(false);
  return (
    <div className="w-80 bg-white drop-shadow-sm rounded-md p-4 flex flex-col gap-2">
      <UserQueryContent />
      <form
        className={`h-10 rounded-md w-full relative ${
          showReply ? "block" : "hidden"
        }`}
      >
        <input
          type="text"
          className="h-full border-2 w-full rounded-md focus:border-blue-400 pl-1 text-gray-800 font-roboto pr-6"
        />
        <i
          className="fal fa-times absolute top-2 right-2 text-xl text-gray-400 cursor-pointer hover:text-red-600"
          onClick={() => setShowReply(false)}
        ></i>
      </form>
      <div onClick={() => setShowReply(true)}>
        {showReply ? (
          <span className="text-sky-600">Send</span>
        ) : (
          <span className="text-red-600">Reply</span>
        )}
      </div>
    </div>
  );
};

export default UserQueryBox;
