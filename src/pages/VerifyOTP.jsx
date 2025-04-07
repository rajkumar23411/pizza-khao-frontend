import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MainNav from "../components/MainNav";
import LoadingButton from "../components/LoadingButton";
import { baseUrl } from "../utils";
const VerifyOTP = () => {
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const { contact } = location.state;
    const [message, setMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleVerifyOTP(otp) {
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                `${baseUrl}/verify/forgot/password/otp`,
                {
                    contact,
                    otp,
                }
            );
            if (data.success) {
                navigate("/reset/password", { state: { contact } });
            }
        } catch (error) {
            setShowError(true);
            setMessage(error.response.data.message);
            setTimeout(() => {
                setShowError(false);
                setMessage("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    }
    const handleChange = (e, index) => {
        const otpCopy = [...otp];
        otpCopy[index] = e.target.value;
        setOTP(otpCopy);

        if (e.target.value === "") {
            if (index > 0) {
                const previousInput = document.getElementById(
                    `otp-${index - 1}`
                );
                previousInput.focus();
            }
        } else if (index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput.focus();
        }
        // check if all otp fields are filled
        if (otpCopy.every((digit) => digit !== "")) {
            // verify otp
            handleVerifyOTP(otpCopy.join(""));
        }
    };
    const handleKeyPress = (e, index) => {
        if (e.key === "ArrowLeft") {
            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        } else if (e.key === "ArrowRight") {
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current.focus();
            }
        }
        if (e.key === "Backspace" && inputRefs[index].current.value === "") {
            e.preventDefault();
            if (index > 0) {
                inputRefs[index - 1].current.focus();
                inputRefs[index - 1].current.value = "";
            }
        }
    };

    useEffect(() => {
        inputRefs[0].current.focus();
    }, []);
    return (
        <>
            <MainNav />
            <div className=" w-full flex items-center justify-center h-[85vh]">
                <div className="flex flex-col items-center justify-center border-2 sm:py-6 p-4 sm:px-10 rounded-md">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-200 flex items-center justify-center rounded-full">
                        <LockOpenOutlinedIcon
                            fontSize="medium"
                            className="text-purple-500"
                        />
                    </div>
                    <p className="mt-8 font-light text-gray-700 text-base w-max">
                        Enter the OTP that has been send to{" "}
                        <span className="text-red-600 font-semibold">
                            {contact}
                        </span>{" "}
                        <span
                            onClick={() => navigate("/forgot/password")}
                            className="font-normal text-blue-600 cursor-pointer hover:text-blue-700 uppercase"
                        >
                            Edit
                        </span>
                    </p>
                    {showError && (
                        <p className="mt-6 bg-red-100 px-10 py-2 rounded border-2 border-red-400 text-red-600">
                            {message}
                        </p>
                    )}
                    <div className="grid grid-cols-6 gap-4 my-6">
                        {otp.map((digit, index) => (
                            <input
                                type="text"
                                key={index}
                                ref={inputRefs[index]}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyPress(e, index)}
                                maxLength={1}
                                id={`otp-${index}`}
                                className="border-2 border-gray-400 h-9 w-9 sm:w-12 sm:h-12 rounded text-center sm:text-lg focus:border-blue-400 focus:shadow"
                            />
                        ))}
                    </div>
                    {isLoading ? (
                        <LoadingButton
                            loading
                            variant="contained"
                            className="w-max px-10 py-2"
                        >
                            Next
                        </LoadingButton>
                    ) : (
                        <button
                            className={`w-max px-10 py-2 font-normal tracking-wide rounded text-white bg-red-600`}
                            disabled={otp.some((digit) => digit === "")}
                            onClick={() => handleVerifyOTP(otp.join(""))}
                        >
                            Verify
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerifyOTP;
