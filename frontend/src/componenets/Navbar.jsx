import React, { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../hooks/useCart";
const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useContext(AuthContext);
  const { cart, fetchCartItems, addToCart } = useCartContext();
  // let token = JSON.parse(localStorage.getItem("token")).token;
  // console.log(token);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchCartItems(user.email); // Fetch cart items when the user is logged in
    }
  }, [user?.email]); // Make sure to re-fetch when user email changes

  const navItems = (
    <>
      <li>
        <Link className="text-grren" to="/">
          Home
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <NavLink to="/menu">All </NavLink>
            </li>
            <li>
              <Link to="/">salad </Link>
            </li>
            <li>
              <Link to="/">Pizza </Link>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <Link to="/">Online Order </Link>
            </li>
            <li>
              <Link to="/">Table Booking </Link>
            </li>
            <li>
              <Link to="/">Order Tracking </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/">Offers</Link>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 right-0 left-0">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out text-black"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src="/logo.png" alt="logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* Search */}
          <button className="btn btn-ghost btn-circle mr-3 hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* cart */}

          <Link to="/cart-page">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 lg:flex items-center justify-center md:flex hidden  "
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {user && (
                  <span className="badge badge-sm indicator-item">
                    {" "}
                    {cart?.length}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {user ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white "
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaRegUser />
              Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
