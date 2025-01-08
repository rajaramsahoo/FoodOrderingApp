import React, { useContext } from "react";
import { FaUserTie } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/admin/Dashboard";
const Profile = ({ users }) => {
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setUser(null);
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="user  was here" src={user.photoURL} />
              ) : (
                <div className="flex items-center justify-center  rounded-full">
                  <FaUserTie size={40} />
                </div>
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {user?.role === "admin" && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
      
            <li>
              <Link to="/update-profile">Profile</Link>
            </li>
            <li>
            <Link to="/order">Orders</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
