import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const HomeFooter = () => {
  return (
    <footer className="w-full flex">
      <div className="footer-left flex-1 flex flex-col box-border p-10">
        <div className="flex justify-between">
          <div className="flex-1 flex flex-col gap-6 p-6">
            <p className="font-bold text-golden uppercase text-lg tracking-wide">
              Find our resturents
            </p>
            <p className="w-[70%] text-gray-400 text-base">
              1614 E. Bell Rd #104. Salerno, AZ 85022 (602) 867-1010
            </p>
            <p className="w-[70%] text-gray-400 text-base">
              204 E. Pizzetta Tommaso Sorrento, AZ 85022 (358) 867-1010
            </p>
            <p className="w-[70%] text-gray-400 text-base">
              Vale Puglia 54 Torre Del Greco AZ 85022 (359) 867-1010
            </p>
            <p className="w-[70%] text-gray-400 text-base">
              Corso Itali AA Naples, AZ 85022 (989) 867-1010
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-6 p-6">
            <p className="font-bold text-golden uppercase text-lg tracking-wide">
              Working Hours
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-golden uppercase text-sm tracking-wider ">
                Monday
              </span>
              <span className="text-lg text-red-700">Kitchen Closed</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-golden uppercase text-sm tracking-wider ">
                Tuesday-friday
              </span>
              <span className="text-lg text-gray-400">09:00-22.00</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-golden uppercase text-sm tracking-wider ">
                Saturday
              </span>
              <span className="text-lg text-gray-400">11am-Midnight</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-golden uppercase text-sm tracking-wider ">
                Sunday
              </span>
              <span className="text-lg text-gray-400">9:00-22:00</span>
            </p>
            <p className="flex gap-1 items-center">
              <span className="font-bold text-golden uppercase text-sm tracking-wide">
                Follow Us:
              </span>
              <span className="flex gap-1">
                <TwitterIcon sx={{ color: "white" }} fontSize="small" />
                <FacebookIcon sx={{ color: "white" }} fontSize="small" />
                <InstagramIcon sx={{ color: "white" }} fontSize="small" />
                <LinkedInIcon sx={{ color: "white" }} fontSize="small" />
              </span>
            </p>
          </div>
          <div className="flex-1 font-medium text-white uppercase text-2xl p-6 leading-10 ">
            THE DON PEPPE CREW FIRST AND FOREMOST VALUES AN AUTHENTIC, WELL
            BAKED SLICE OF PIZZA.
          </div>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-golden text-base">
            &copy; 2022 <span className="text-green-700">Rajkumar</span>
          </p>
          <img
            src="/images/footer-bottom-img.png"
            alt="footer-bottom-img"
            draggable="false"
          />
        </div>
      </div>
      <div className="footer-right lg:flex-1 md:hidden">
        <img
          src="/images/footer-img-2.jpg"
          alt="footer-img-2"
          className="h-full w-full object-cover"
          draggable="false"
        />
      </div>
    </footer>
  );
};

export default HomeFooter;
