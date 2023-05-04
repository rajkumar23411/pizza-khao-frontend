import React from "react";

const PizzaBox = () => {
  return (
    <div className="w-full flex items-center justify-between lg:px-20 md:p-10 p-5">
      <div className="flex flex-1 flex-col gap-2">
        <small className="uppercase text-red-700 tracking-wider font-medium  text-xs lg:text-base md:text-base">
          Come and get
        </small>
        <p className="text-2xl lg:text-4xl md:text-3xl uppercase font-medium text-gray-700 tracking-wide">
          Smart pizza slice box
        </p>
        <p className="text-sm md:text-lg font-light text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          nesciunt dignissimos beatae expedita enim quasi veritatis sed facilis
          quis non?
        </p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              EORDER PIZZA
            </p>
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/box-1.png?updatedAt=1683123622067"
              alt="box-1"
              draggable="false"
              className="h-20 lg:h-full md:h-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              Separate box
            </p>
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/box-2.png?updatedAt=1683123622063"
              alt="box-2"
              className="h-20 lg:h-full md:h-full"
              draggable="false"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              use as coaster
            </p>
            <img
              src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/box-3.png?updatedAt=1683123622015"
              alt="box-3"
              className="h-20 lg:h-full md:h-full"
              draggable="false"
            />
          </div>
        </div>
      </div>
      <div className=" lg:flex hidden flex-1 h-full items-center justify-end">
        <img
          src="https://ik.imagekit.io/zquvvhmdy/pizza_khao/pizza-box.png?updatedAt=1683123630689"
          alt="pizza-box"
          className="h-[23rem]"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default PizzaBox;
