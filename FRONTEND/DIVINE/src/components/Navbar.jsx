// import React from "react";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-blend-difference px-6 py-3 flex justify-between items-center fixed-top"  style={{ backgroundColor: "##fff8f0" }}>
      
      <div className="text-2xl font-bold"><img src={logo} alt="" /></div>

      
    </nav>
  );
};

export default Navbar;

