import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const CouponApplied = () => {
    const { width, height } = useWindowSize();
    return (
        <div className="overflow-hidden z-50">
            <Confetti
                width={width}
                height={height}
                numberOfPieces={1000}
                gravity={0.2}
                initialVelocityX={8.1}
            />
            <div className="h-screen w-screen fixed flex items-center justify-center flex-col gap-4 ">
                <div className="text-center z-50">
                    <h1 className="text-3xl uppercase font-semibold text-red-600">
                        Woohoo!
                    </h1>
                    <h2 className="text-3xl uppercase font-medium text-red-600">
                        Coupon applied successfully
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default CouponApplied;
