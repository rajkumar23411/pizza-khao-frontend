import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
const Quotes = () => {
  return (
    <div className="bg-hello-text h-60 md:h-96 my-20 w-full flex items-center justify-center flex-col">
      <div className="lg:w-1/2 md:w-[80%] text-center flex flex-col gap-2 items-center justify-center">
        <FormatQuoteIcon sx={{ fontSize: "5rem", color: "#B7903C" }} />
        <p className="text-lg md:text-2xl w-full md:w-4/5 uppercase font-medium text-gray-800">
          "Forget the trendy pizza shops, the hidden spot make the best
          indian-style pizza slice in naples"
        </p>
        <small className="text-sm md:text-base tracking-wide text-red-600 font-medium">
          JON DOE POST 2023
        </small>
      </div>
    </div>
  );
};

export default Quotes;
