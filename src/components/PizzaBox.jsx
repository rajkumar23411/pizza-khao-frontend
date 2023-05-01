import React from "react";

const PizzaBox = () => {
  return (
    <div className="w-full flex items-center justify-between lg:px-20 md:p-10">
      <div className="flex flex-1 flex-col gap-2">
        <small className="uppercase text-red-700 tracking-wider font-medium text-base">
          Come and get
        </small>
        <p className="lg:text-4xl md:text-3xl uppercase font-bold text-gray-700 tracking-wide ">
          Smart pizza slice box
        </p>
        <p className="text-lg font-light text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          nesciunt dignissimos beatae expedita enim quasi veritatis sed facilis
          quis non?
        </p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              EORDER PIZZA
            </p>
            <img src="/images/box-1.png" alt="box-1" draggable="false" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              Separate box
            </p>
            <img src="/images/box-2.png" alt="box-2" draggable="false" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-yellow-700 uppercase text-sm tracking-wide">
              use as coaster
            </p>
            <img src="/images/box-3.png" alt="box-3" draggable="false" />
          </div>
        </div>
      </div>
      <div className="lg:flex md:hidden flex-1 h-full items-center justify-end">
        <img
          src="/images/pizza-box.png"
          alt="pizza-box"
          className="h-[23rem]"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default PizzaBox;
