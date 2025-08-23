import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/login";


const Homelogin = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#002044" }}>

      <Navbar />

      
      <div className="flex items-center justify-center px-6 py-12" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 " style={{ color: "#fff8f0" }}>
              Divine Management System
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to Divine Management System. Please log in to continue and
              manage your services efficiently.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homelogin;

