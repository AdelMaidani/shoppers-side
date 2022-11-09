import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import TwitterIcon from "../assets/Icons/twitter.png";
import FacebookIcon from "../assets/Icons/facebook.png";
import InstagramIcon from "../assets/Icons/instagram.png";
import { useUser } from "../contexts/UserContext";

const Footer = () => {
  const { userType } = useUser();
  return (
    <div className="p-10 w-full mt-auto bg-black text-white text-xs text-center gap-5 flex flex-col sm:flex-row justify-around">
      <Link to={"/"} className="hidden sm:block">
        <img src={Logo} className="h-32" alt="" />
      </Link>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold underline underline-offset-8">
          Menu
        </span>
        <div className="flex flex-col gap-2 text-gray-400">
          <Link className="hover:text-white duration-300" to={"/men"}>
            Men
          </Link>
          <Link className="hover:text-white duration-300" to={"/women"}>
            Women
          </Link>
          <Link className="hover:text-white duration-300" to={"/kid"}>
            Kid
          </Link>
          <Link className="hover:text-white duration-300" to={"/accesories"}>
            Accesories
          </Link>
          <Link
            className={` "hover:text-white duration-300" ${
              userType === "Null" ? "" : "hidden"
            }`}
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className={` "hover:text-white duration-300" ${
              userType === "Null" ? "" : "hidden"
            }`}
            to={"/signUp"}
          >
            Sign Up
          </Link>
          <Link
            className={` "hover:text-white duration-300" ${
              userType === "Null" ? "" : "hidden"
            }`}
            to={"/vendorLogin"}
          >
            Vendor Login
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <span className="text-sm font-bold underline underline-offset-8">
          Location
        </span>
        <div className="text-gray-400 flex flex-col gap-4 text-xs items-center">
          <span>A/2, Nainkunj Soc, New Sama Road, New Sama Road</span>
          <span>Vadodara</span>
          <span>Gujarat</span>
          <span>390008</span>
          <span>India</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-sm font-bold underline underline-offset-8">
          Contact
        </span>
        <span className="text-gray-400 hover:text-white duration-300">
          Phone: 8293777287
        </span>
        <span className="text-gray-400 hover:text-white duration-300">
          Mail Id: shoppersside@sales.com
        </span>
        <div className="text-sm font-bold underline underline-offset-8">
          Socials
        </div>
        <div className="flex items-center justify-center">
          <img src={TwitterIcon} alt="" />
          <img src={FacebookIcon} alt="" />
          <img src={InstagramIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
