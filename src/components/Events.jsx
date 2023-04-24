import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Events = () => {
  return (
    <div className="p-20">
      <div className="flex justify-between">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-red-700 uppercase tracking-wider text-sm font-medium">
            don't miss our events
          </p>
          <p className="uppercase text-4xl font-bold text-gray-800">
            our happenings
          </p>
          <p className="text-gray-500 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, fugit
            ab. Dolores veritatis nobis laudantium recusandae unde soluta quia
            accusamus.
          </p>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="bg-gray-800 h-max text-white py-4 px-6 uppercase text-sm font-medium tracking-widest hover:bg-slate-900 cursor-pointer">
            See all events
          </span>
        </div>
      </div>
      <div className="h-auto flex pt-6 gap-20 justify-between">
        <div className="flex-[0.8]">
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-6xl text-red-700 font-bold">09</p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-2xl font-bold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-base text-gray-400 w-3/4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span>204 E. Pizzetta Tommaso</span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-6xl text-red-700 font-bold">09</p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-2xl font-bold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-base text-gray-400 w-3/4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span>204 E. Pizzetta Tommaso</span>
              </p>
            </div>
          </div>
          <div className="flex gap-6 border-b-2 border-dotted border-golden py-10">
            <div className="text-center">
              <p className="text-6xl text-red-700 font-bold">09</p>
              <p className="uppercase text-golden text-xl font-semibold">OCT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="uppercase text-2xl font-bold text-gray-800 tracking-wide">
                sienna private dining room
              </h1>
              <p className="text-base text-gray-400 w-3/4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                modi repellendus pariatur maiores non voluptatibus,
              </p>
              <p className="flex items-center gap-1 text-xs text-red-600 font-medium">
                <LocationOnIcon fontSize="small" />
                <span>204 E. Pizzetta Tommaso</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-[0.6] flex items-center justify-center">
          <img
            src="/images/h1-img-5a.jpg"
            alt="man"
            className="h-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
