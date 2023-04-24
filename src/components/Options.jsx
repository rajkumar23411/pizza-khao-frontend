import React from "react";
import { Link } from "react-router-dom";

const Options = () => {
  const assets = [
    {
      img: "/images/asset1.jpg",
      title: "Order online",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quis,",
      link: "/menu-light",
      linkName: "Order now",
    },
    {
      img: "/images/asset2.jpg",
      title: "Our menu",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, maxime.",
      link: "/resturent-menu",
      linkName: "View menu",
    },
    {
      img: "/images/asset3.jpg",
      title: "explore kitchen",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, sit.",
      link: "/menu",
      linkName: "explore",
    },
  ];
  return (
    <div className="h-screen p-20 w-full">
      <div className="flex flex-col items-center gap-2">
        <p className="text-red-600 uppercase font-normal text-sm tracking-wider">
          the magic of flavor
        </p>
        <h1 className="uppercase text-4xl font-roboto text-gray-600 font-semibold">
          स्वागतम् दोस्त
        </h1>
        <p className="w-1/2 text-center text-lg font-light text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
          commodi maxime debitis nam aliquid placeat minima excepturi quidem est
          iusto!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-14 pt-10">
        {assets.map((asset, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <div>
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
