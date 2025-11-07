import React from "react";
import { NavLink } from "react-router-dom";
import banklogo from "../../assets/images/cblogo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[15vh] bg-gray-300 px-[7rem]">
      <div>
        <img src={banklogo} className="w-[6rem]" alt="bank logo" />
      </div>
      <div className="flex items-center space-x-4">
        <a
          className="hover:bg-slate-300/[0.1] py-1 px-3 rounded-lg transition duration-500 font-semibold"
          href="https://github.com/anshulghogre4/online-banking-springboot-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <NavLink
          to="/contactUs"
          className="hover:bg-slate-300/[0.1] py-1 px-3 rounded-lg transition duration-500 font-semibold"
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/about"
          className="hover:bg-slate-300/[0.1] py-1 px-3 rounded-lg transition duration-500 font-semibold"
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className="bg-[#f1f2f6] hover:bg-slate-600 hover:text-[#f1f2f6] py-1 px-3 rounded-lg transition duration-500 font-semibold"
        >
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
