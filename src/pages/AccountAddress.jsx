import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountNav from "../components/AccountNav";
import AddressBox from "../components/AddressBox";
import AddressForm from "../components/AddressForm";
import MainNav from "../components/MainNav";
import { myAddresses } from "../redux/actions/addressAction";
import { useSnackbar } from "notistack";
import { ADD_NEW_ADDRESS_RESET } from "../redux/constants/addressConstant";
import Loader from "../components/Loader";
import PageHead from "../components/PageHead";

const AccountAddress = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { loading, addresses } = useSelector((state) => state.myAddresses);
  const { success, error } = useSelector((state) => state.newAddress);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Address added successfully", { variant: "success" });
      setShowAddressForm(false);
      dispatch({ type: ADD_NEW_ADDRESS_RESET });
    }
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    dispatch(myAddresses());
  }, [dispatch, success, error, enqueueSnackbar]);
  return (
    <>
      <section>
        <div>
          <MainNav />
        </div>
        <PageHead pageName={"My Account"} />
      </section>
      <section className="flex items-start gap-4 p-20 bg-slate-50 h-screen max-h-full">
        <AccountNav />
        <div className="flex-1 bg-white shadow-md p-10 flex flex-col min-h-full gap-6 rounded-md">
          <h1 className="uppercase text-golden font-normal tracking-wider text-xl">
            Manage Address
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex flex-col">
                <div
                  className={`flex items-center justify-between ${
                    showAddressForm
                      ? "bg-none"
                      : "border-2 border-red-500 w-max rounded-sm "
                  }  ${showAddressForm ? "px-8 py-2" : "p-2"}`}
                >
                  <div
                    className={`flex items-center gap-2 cursor-pointer`}
                    onClick={() => setShowAddressForm(true)}
                  >
                    {showAddressForm === false && (
                      <Add className="text-red-600" />
                    )}
                    <span
                      className={`tracking-wide text-sm ${
                        showAddressForm ? "text-gray-700" : "text-red-600"
                      } font-normal uppercase`}
                    >
                      Add a new address
                    </span>
                  </div>
                  {showAddressForm && (
                    <div
                      onClick={() => setShowAddressForm(false)}
                      className={`cursor-pointer text-red-600 font-normal capitalize`}
                    >
                      Cancel
                    </div>
                  )}
                </div>

                {showAddressForm && <AddressForm button={"Save Address"} />}
              </div>

              {addresses.length === 0 ? (
                <div
                  className={`h-96 w-full ${
                    showAddressForm ? "hidden" : "flex"
                  } items-center justify-center`}
                >
                  <p className="text-gray-600 text-lg">
                    You have not any addresses to show yet
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 border-gray-300 w-full">
                  {addresses &&
                    addresses.map((address) => (
                      <AddressBox key={address._id} address={address} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AccountAddress;
