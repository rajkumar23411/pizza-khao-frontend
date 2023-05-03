import React from "react";
import { Link } from "react-router-dom";

const Options = () => {
  const assets = [
    {
      img: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/asset1.jpg?updatedAt=1683123622348",
      title: "Order online",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quis,",
      link: "/menu-light",
      linkName: "Order now",
    },
    {
      img: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/asset2.jpg?updatedAt=1683123622023",
      title: "Our menu",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, maxime.",
      link: "/resturent-menu",
      linkName: "View menu",
    },
    {
      img: "https://ik.imagekit.io/zquvvhmdy/pizza_khao/asset3.jpg?updatedAt=1683123622225",
      title: "explore kitchen",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, sit.",
      link: "/menu",
      linkName: "explore",
    },
  ];
  return (
    <div className="lg:h-screen md:h-[60vh] lg:p-20 md:p-14 w-full flex items-center justify-center flex-col">
      <div className="flex flex-col items-center gap-2">
        <p className="text-red-600 uppercase font-normal text-sm tracking-wider">
          the magic of flavor
        </p>
        <h1 className="uppercase lg:text-4xl md:text-3xl text-gray-600 font-semibold">
          स्वागतम् दोस्त
        </h1>
        <p className="lg:w-1/2 md:w-2/3 text-center lg:text-lg md:text-sm font-light text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
          commodi maxime debitis nam aliquid placeat minima excepturi quidem est
          iusto!
        </p>
      </div>
      <div className="grid grid-cols-3 lg:gap-14 md:gap-10  pt-10">
        {assets.map((asset, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <div className="rounded overflow-hidden">
              <img src={asset.img} alt={asset.title} />
            </div>
            <h1 className="uppercase tracking-wide text-gray-800 text-xl font-medium">
              {asset.title}
            </h1>
            <p className="text-gray-500 font-light">
              {asset.desc.length > 65
                ? `${asset.desc.slice(0, 65)}...`
                : `${asset.desc}`}
            </p>
            <span className="text-golden tracking-widest uppercase font-medium text-xs">
              <Link to={asset.link}>{asset.linkName}</Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
