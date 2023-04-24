import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteAddress,
  myAddresses,
} from "../redux/actions/addressAction";
const PromptModel = ({ displayText, buttonText, onClose, caneclText, id }) => {
  const dispatch = useDispatch();
  const { isDeleted, error } = useSelector((state) => state.deleteAddress);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    dispatch(deleteAddress(id));
  };

  useEffect(() => {
    if (isDeleted) {
      onClose();
      enqueueSnackbar("Address deleted successfully", { variant: "success" });
      dispatch(myAddresses());
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearError());
    }
  }, [isDeleted, error, dispatch, enqueueSnackbar]);
  return (
    <div className="bg-white rounded-md shadow-lg p-8 flex flex-col gap-10">
      <p className="text-gray-700 font-semibold text-lg">{displayText}</p>
      <div className="flex items-center flex-col gap-3">
        <span
          className="bg-red-500 text-white px-4 py-2 rounded-sm font-medium cursor-pointer hover:bg-red-600"
          onClick={handleDelete}
        >
          {buttonText}
        </span>
        <span
          className="text-blue-600 font-semibold cursor-pointer"
          onClick={onClose}
        >
          {caneclText}
        </span>
      </div>
    </div>
  );
};

export default PromptModel;
