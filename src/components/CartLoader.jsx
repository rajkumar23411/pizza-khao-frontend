import { Skeleton } from "@mui/material";
import React from "react";

const CartLoader = () => {
    return (
        <section className="h-[50rem] flex p-10">
            <div className="flex flex-col p-6 flex-1 gap-10">
                <div>
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {Array(8)
                            .fill(null)
                            .map((_, index) => (
                                <Skeleton
                                    sx={{
                                        bgcolor: "grey.300",
                                    }}
                                    animation="wave"
                                    key={index}
                                    variant="rectangular"
                                    width={240}
                                    height={220}
                                    className="rounded-xl "
                                />
                            ))}
                    </div>
                </div>
                <div>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={60}
                        width={300}
                    />
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <Skeleton
                                    sx={{
                                        bgcolor: "grey.300",
                                    }}
                                    animation="wave"
                                    key={index}
                                    variant="rectangular"
                                    width={240}
                                    height={220}
                                    className="rounded-xl "
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex-[0.35] flex flex-col items-center mt-10 gap-10">
                <Skeleton
                    height={600}
                    width={400}
                    animation="wave"
                    variant="rectangular"
                />
                <Skeleton
                    height={100}
                    width={400}
                    animation="wave"
                    variant="rectangular"
                />
            </div>
        </section>
    );
};

export default CartLoader;
