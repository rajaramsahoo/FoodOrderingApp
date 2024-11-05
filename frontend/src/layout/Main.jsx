import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import { AuthContext } from "../context/AuthProvider";
import LoadingSpinner from "../componenets/LoadingSpinner";
// import axios from "axios";
const Main = () => {

  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="">
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
