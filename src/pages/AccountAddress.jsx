import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountNav from "../components/AccountNav";
import AddressBox from "../components/AddressBox";
import AddressForm from "../components/AddressForm";
import MainNav from "../components/MainNav";
import { myAddresses } from "../redux/actions/addressAction";
import toaster from "react-hot-toast";
import { ADD_NEW_ADDRESS_RESET } from "../redux/constants/addressConstant";
import Loader from "../components/Loader";
import PageHead from "../components/PageHead";
import HomeFooter from "../components/HomeFooter";

const AccountAddress = () => {
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
    }, [dispatch, success, error]);
    return (
        <>
            <MainNav />
            <PageHead pageName={"My Account"} />
            <section className="flex items-start gap-4 lg:p-20 md:px-5 md:py-10 bg-slate-50 h-full">
                <AccountNav />
                <div className="flex-1 bg-white shadow-md p-10 flex flex-col md:min-h-[33.3rem] lg:min-h-full gap-6 rounded-md">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="uppercase text-golden font-oswald font-medium tracking-wide text-xl">
                            Manage Address
                        </h1>
                        <div
                            className={` ${
                                showAddressForm ? "hidden" : "flex"
                            } items-center justify-center w-max uppercase tracking-wider gap-1 cursor-pointer text-red-600 font-medium`}
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
                                    onClose={() => setShowAddressForm(false)}
                                />
                            )}
                            {addresses?.length === 0 ? (
                                <div
                                    className={`h-96 w-full ${
                                        showAddressForm ? "hidden" : "flex"
                                    } items-center justify-center`}
                                >
                                    <p className="text-gray-600 text-lg">
                                        You don't have any address to show
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 border-gray-300 w-full">
                                    {addresses &&
                                        addresses.map((address) => (
                                            <AddressBox
                                                key={address._id}
                                                address={address}
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

export default AccountAddress;
