import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homelogin from "../pages/login";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import ApplicationList from "../pages/ApplicationList";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homelogin />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Registration />} />
        <Route path="/applications" element={<ApplicationList />} />

        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
