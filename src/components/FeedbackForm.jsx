import React from "react";
import { Rating, useMediaQuery } from "@mui/material";
import axios from "axios";
import toaster from "react-hot-toast";
const FormInput = ({ name, value, handleFormInputChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value[name]}
      onChange={(e) => handleFormInputChange(e)}
      className="w-full h-8 md:h-10 bg-transparent border border-gray-500 pl-2 focus:border-blue-600 focus:shadow focus:shadow-blue-300 rounded"
    />
  );
};
const Label = ({ name }) => {
  return (
    <label htmlFor={name} className="font-roboto text-xs text-gray-700">
      {name}*
    </label>
  );
};
const FormDiv = ({ children }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};

const FeedbackForm = () => {
  const [formInput, setFormInput] = React.useState({
    firstname: "",
    lastname: "",
    comment: "",
    rating: 0,
  });
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [loading, setLoading] = React.useState(false);
  const handleFromValueChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/feedback/new", formInput);
      if (data.success) toaster.success(data.message);
    } catch (err) {
      toaster.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-6 h-full w-full">
      <div className="text-center">
        <h1 className="text-lg md:text-2xl uppercase font-medium text-golden">
          We value your input
        </h1>
        <p className="text-gray-500 font-light text-sm md:text-base">
          Share your thoughts and help us improve your experience.
        </p>
      </div>
      <form
        className="z-30 flex flex-col gap-2 md:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3 w-96 md:w-[28rem]">
          <FormDiv>
            <Label name={"First name"} />
            <FormInput
              name={"firstname"}
              value={formInput}
              handleFormInputChange={handleFromValueChange}
            />
          </FormDiv>
          <FormDiv>
            <Label name={"Last name"} />
            <FormInput
              name={"lastname"}
              value={formInput}
              handleFormInputChange={handleFromValueChange}
            />
          </FormDiv>
        </div>
        <FormDiv>
          <Label name={"Comment"} />
          <textarea
            rows={isSmallScreen ? 2 : 3}
            className="border pl-2 pt-1 focus:border-blue-600 focus:shadow focus:shadow-blue-300 bg-transparent border-gray-500 w-full resize-none rounded"
            name="comment"
            value={formInput.comment}
            onChange={(e) => handleFromValueChange(e)}
          ></textarea>
        </FormDiv>
        <FormDiv>
          <Label name={"Rating"} />
          <Rating
            precision={0.5}
            size="large"
            name="rating"
            value={parseFloat(formInput.rating)}
            onChange={(e) => handleFromValueChange(e)}
          />
        </FormDiv>
        <button
          type="submit"
          disabled={loading ? true : false}
          className={`${
            loading
              ? "bg-blue-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } rounded py-2 text-white font-sans`}
        >
          {loading ? (
            <span>
              <i className="fad fa-spinner-third fa-spin text-base"></i>
              &nbsp;&nbsp;
              <small className=" text-gray-100 font-sans">Submitting...</small>
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
