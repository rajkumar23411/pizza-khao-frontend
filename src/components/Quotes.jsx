import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
const Quotes = () => {
  return (
    <div className="bg-hello-text h-96 my-20 w-full flex items-center justify-center flex-col">
      <div className="w-2/3 text-center flex flex-col gap-2 items-center justify-center">
        <FormatQuoteIcon sx={{ fontSize: "5rem", color: "#B7903C" }} />
        <p className="text-2xl w-4/5 uppercase font-medium text-gray-800">
          "Forget the trendy pizza shops, the hidden spot make the best
          indian-style pizza slice in naples"
        </p>
        <small className="text-base tracking-wider text-red-600 font-bold">
          JON DOE POST 2023
        </small>
      </div>
    </div>
  );
};

export default Quotes;
