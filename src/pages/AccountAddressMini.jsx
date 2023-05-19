import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav";
import Loader from "../components/Loader";
import { Add } from "@mui/icons-material";
import AddressBox from "../components/AddressBox";
import HomeFooter from "../components/HomeFooter";
import { useDispatch, useSelector } from "react-redux";
import toaster from "react-hot-toast";
import { ADD_NEW_ADDRESS_RESET } from "../redux/constants/addressConstant";
import { myAddresses } from "../redux/actions/addressAction";
import PageHead from "../components/PageHead";
import AddressForm from "../components/AddressForm";

const AccountAddressMini = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { loading, addresses } = useSelector((state) => state.myAddresses);
  const { success, error } = useSelector((state) => state.newAddress);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      toaster.success("Address added successfully");
      setShowAddressForm(false);
      dispatch({ type: ADD_NEW_ADDRESS_RESET });
    }
    if (error) {
      toaster.error(error);
    }
    dispatch(myAddresses());
  }, [dispatch, success, error, toaster]);
  return (
    <>
      <MainNav />
      <PageHead pageName={"My Account"} />
      <section className="flex items-start gap-4 lg:p-20 md:px-5 md:py-10 bg-slate-50 min-h-[20rem] sm:h-full p-2">
        <div className="flex-1 bg-white shadow-md p-5 flex flex-col md:min-h-[33.3rem] lg:min-h-full gap-6 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="uppercase text-golden font-medium tracking-wider">
              Manage Address
            </h1>
            <div
              className={`text-red-600 font-medium w-max text-xs ${
                showAddressForm ? "hidden" : "flex"
              } items-center justify-center uppercase`}
              onClick={() => setShowAddressForm(true)}
            >
              <Add fontSize="small" />
              <span>Add new address</span>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <>
              {showAddressForm && (
                <AddressForm
                  button={"Save Address"}
                  onCancel={() => setShowAddressForm(false)}
                />
              )}
              {addresses.length === 0 ? (
                <div
                  className={`h-96 w-full ${
                    showAddressForm ? "hidden" : "flex"
                  } items-center justify-center`}
                >
                  <p className="text-gray-600 text- base">
                    You have not any addresses to show yet
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 border-gray-300 w-full">
                  {addresses &&
                    addresses.map((address) => (
                      <AddressBox
                        key={address._id}
                        address={address}
                        onClose={() => setShowAddressForm(false)}
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <HomeFooter />
    </>
  );
};

export default AccountAddressMini;
