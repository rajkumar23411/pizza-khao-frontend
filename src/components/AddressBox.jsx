import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditAddressForm from "./EditAddressForm";
import PromptModel from "./PromptModel";

const AddressBox = ({ address }) => {
  const [showMenu, setShowMenu] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleAddressModel = () => {
    setIsModelOpen(true);
  };
  const toggleMenu = (index) => {
    setShowMenu(index);
  };

  return (
    <div className="w-full flex flex-col border-b-2">
      <div className="flex items-center justify-between p-4">
        <p className="flex items-center gap-4">
          <span className="font-normal text-gray-800">{address.name}</span>
          <span className="font-normal text-gray-800">{address.contact}</span>
        </p>
        <div className="cursor-pointer" onMouseEnter={() => toggleMenu(1)}>
          <div className="relative">
            <DragIndicatorIcon className="text-gray-600" />
            <div
              className={`absolute bg-white shadow-md right-0 top-0 w-20 ${
                showMenu === 1 ? "block" : "hidden"
              }`}
              onMouseEnter={() => toggleMenu(1)}
              onMouseLeave={() => toggleMenu(0)}
            >
              <p
                className="p-2 hover:bg-slate-50 hover:text-blue-600 cursor-pointer"
                onClick={handleAddressModel}
              >
                Edit
              </p>
              <p
                className="p-2 hover:bg-slate-50 hover:text-blue-600 cursor-pointer"
                onClick={(e) => setShowPrompt(true)}
              >
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 w-[65%] p-4 font-light">
        {address.locality} {address.address} {address.city} {address.landMark}{" "}
        {address.alternatContact} <br />
        {address.state} - {address.pinCode}
      </p>
      {isModelOpen && (
        <div className="h-screen w-screen backdrop-blur-sm backdrop-brightness-50 top-0 left-0 right-0 fixed flex items-center justify-center">
          <div className="w-1/2 bg-white rounded-md shadow-md">
            <EditAddressForm
              onClose={() => setIsModelOpen(false)}
              address={address && address}
            />
          </div>
        </div>
      )}
      {showPrompt && (
        <div className="h-screen w-screen top-0 left-0 right-0 fixed flex items-center justify-center backdrop-blur-md backdrop-brightness-50">
          <PromptModel
            displayText={"Are you sure you want to delete this address?"}
            buttonText={"Yes, Delete"}
            caneclText={"Cancel"}
            onClose={() => setShowPrompt(false)}
            id={address && address._id}
          />
        </div>
      )}
    </div>
  );
};

export default AddressBox;
