import React, { useContext, useState } from 'react'
import { MenuContext } from "../../../hooks/useMenu"
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';

const ManageItems = () => {
    const { menu, setMenu } = useContext(MenuContext);
    const [currentPage, setCurrentPage] = useState(1);
    const items_Per_Page = 10;
    const indexOfLastItem = currentPage * items_Per_Page;
    const indexOfFirstItem = indexOfLastItem - items_Per_Page;
    const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

    // delete item
    const handleDeleteItem = async (item) => {
        const token = JSON.parse(localStorage.getItem("token"))?.token;

        if (!token) {
            Swal.fire({
                title: "Error",
                text: "You are not authenticated.",
                icon: "error",
            });
            return;
        }

        // Display confirmation dialog
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        // Proceed if confirmed
        if (confirmDelete.isConfirmed) {
            try {
                const res = await axios.delete(
                    `${process.env.REACT_APP_BASEURL}/menu/delete/${item._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setMenu((prevMenu) => prevMenu.filter((menuItem) => menuItem._id !== item._id));
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete the item.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while deleting the item.",
                    icon: "error",
                });
            }
        }
    };

    return (
        <div className="w-full md:w-[870px] mx-auto px-4 ">
            <h2 className="text-2xl font-semibold my-4">
                Manage All <span className="text-green">Menu Items!</span>
            </h2>

            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update-menu/${item._id}`}>
                                            <button className="btn btn-ghost btn-xs bg-orange-500">
                                                <FaEdit
                                                    className="text-white 
                                          "
                                                ></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-xs"
                                        >
                                            <FaTrashAlt className="text-red"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center my-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-sm mr-2 btn-warning"
                >
                    <FaArrowLeft /> Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= menu.length}
                    className="btn btn-sm bg-green text-white"
                >
                    Next  <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default ManageItems