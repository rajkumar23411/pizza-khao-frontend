import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Events = () => {
  return (
    <div className="p-5 lg:p-20 md:p-10">
      <div className="flex flex-col gap-4 lg:justify-between lg:flex-row md:justify-between md:flex-row ">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-red-700 uppercase tracking-wider text-xs lg:text-sm md:text-sm font-medium">
            don't miss our events
          </p>
          <p className="uppercase text-2xl lg:text-4xl md:text-4xl font-bold text-gray-800">
            our happenings
          </p>
          <p className="text-gray-500 text-sm font-light lg:text-lg md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, fugit
            ab. Dolores veritatis nobis laudantium recusandae unde soluta quia
            accusamus.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="bg-gray-800 h-max text-white py-2 px-4 text-xs lg:py-4 md:py-4 lg:px-6 md:px-6 uppercase lg:text-sm md:text-sm font-medium tracking-widest hover:bg-slate-900 cursor-pointer">
            See all events
          </span>
        </div>
      </div>
      <div className="h-auto flex pt-6 gap-20 justify-between">
        <div className="lg:flex-[0.8] md:flex-1">
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-2xl lg:text-6xl md:text-4xl text-red-700 font-bold">
                09
              </p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-xl lg:text-2xl md:text-2xl font-semibold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-xs lg:text-base md:text-base text-gray-400 lg:w-3/4 md:w-3/4 font-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span className="text-sm font-light">
                  204 E. Pizzetta Tommaso
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-2xl lg:text-6xl md:text-4xl text-red-700 font-bold">
                09
              </p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-xl lg:text-2xl md:text-2xl font-semibold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-xs lg:text-base md:text-base text-gray-400 lg:w-3/4 md:w-3/4 font-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span className="text-sm font-light">
                  204 E. Pizzetta Tommaso
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-2xl lg:text-6xl md:text-4xl text-red-700 font-bold">
                09
              </p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-xl lg:text-2xl md:text-2xl font-semibold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-xs lg:text-base md:text-base text-gray-400 lg:w-3/4 md:w-3/4 font-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span className="text-sm font-light">
                  204 E. Pizzetta Tommaso
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden flex-[0.6] sm:hidden items-center justify-center md:hidden lg:flex">
          <img
            src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/h1-img-5a.jpg?updatedAt=1683123626060"
            alt="man"
            className="h-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
