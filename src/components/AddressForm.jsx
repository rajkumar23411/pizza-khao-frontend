import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/actions/addressAction";

const AddressForm = ({ button, onCancel, bg }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [contact, setContact] = useState();
  const [pincode, setPincode] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [altContact, setAltContact] = useState();

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addAddress(
        name,
        contact,
        pincode,
        address,
        city,
        state,
        locality,
        landmark,
        altContact
      )
    );
  };

  return (
    <form
      className={`flex flex-col gap-2 lg:p-5 md:p-5 bg-white`}
      onSubmit={handleAddressSubmit}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-sm sm:text-xl text-golden uppercase tracking-wider font-normal">
          Add your address
        </h1>
        <span
          onClick={onCancel}
          className="text-red-600 font-medium uppercase text-sm tracking-wider cursor-pointer"
        >
          Close
        </span>
      </div>
      <div className="flex w-full gap-4 mt-4">
        <input
          type="text"
          placeholder="Full Name*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="number"
          placeholder="Phone number*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />
      </div>
      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="Pincode*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setPincode(e.target.value)}
          value={pincode}
        />
        <input
          type="text"
          placeholder="Locality*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setLocality(e.target.value)}
          value={locality}
        />
      </div>
      <div className="w-full">
        <textarea
          cols="30"
          rows="3"
          className="resize-none w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          placeholder="Address (area and street)*"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        ></textarea>
      </div>
      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="City/District/Town*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <input
          type="text"
          placeholder="State*"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </div>
      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="Landmark (Optional)"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setLandmark(e.target.value)}
          value={landmark}
        />
        <input
          type="number"
          placeholder="Alternate Phone (optional)"
          className="w-full border-[1px] border-gray-400 p-2 placeholder:font-light placeholder:text-sm sm:p-3 bg-transparent focus:border-red-600 focus:placeholder:text-red-400 rounded"
          onChange={(e) => setAltContact(e.target.value)}
          value={altContact}
        />
      </div>
      <div className="w-full text-center">
        <input
          type="submit"
          value={button}
          className="uppercase bg-red-600 text-white w-max px-6 text-sm sm:text-base py-2 font-normal tracking-wider hover:bg-red-700 cursor-pointer rounded"
        />
      </div>
    </form>
  );
};

export default AddressForm;
