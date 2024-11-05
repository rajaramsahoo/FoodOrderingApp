import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASEURL}/users`);
      console.log(res.data);
      setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMakeAdmin = async (user) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASEURL}/users/admin/${user._id}`
      );
      fetchAllUsers();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.email} is an Admin Now!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Failed to make ${user.email} an Admin!`,
        text: error.response ? error.response.data.message : error.message,
        showConfirmButton: true,
      });
    }
  };

  const handleDeleteUser = async (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${process.env.REACT_APP_BASEURL}/users/${user._id}`
          );

          // Show success message if the deletion is successful
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          fetchAllUsers();
        } catch (error) {
          // Handle any errors
          console.error("Error deleting the user:", error);

          // Show error alert if there's an issue with deletion
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Unable to delete the user.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between mx-4 my-4">
        <h2 className="text-2xl">All Users</h2>
        <h2 className="text-2xl">Total Users: {allUsers.length}</h2>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-circle bg-indigo-500"
                      >
                        <FaUsers className="text-white"></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
//admin user cant delete another admin user
// const handleDeleteUser = async (user) => {
//   // Prevent admin from deleting another admin
//   if (user.role === "admin") {
//     Swal.fire({
//       title: "Action Denied!",
//       text: "Admins cannot delete other admins.",
//       icon: "error",
//     });
//     return; // Exit the function early
//   }

//   // Proceed with deletion if the user is not an admin
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${process.env.REACT_APP_BASEURL}/users/${user._id}`);

//         // Show success message if the deletion is successful
//         Swal.fire({
//           title: "Deleted!",
//           text: "The user has been deleted.",
//           icon: "success",
//         });

//         fetchAllUsers();
//       } catch (error) {
//         // Handle any errors
//         console.error("Error deleting the user:", error);

//         // Show error alert if there's an issue with deletion
//         Swal.fire({
//           title: "Error!",
//           text: "Something went wrong. Unable to delete the user.",
//           icon: "error",
//         });
//       }
//     }
//   });
// };
