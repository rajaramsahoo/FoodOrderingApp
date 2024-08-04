import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
