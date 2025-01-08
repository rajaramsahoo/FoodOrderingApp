import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import axios from 'axios';
import Swal from "sweetalert2";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const ManageBooking = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
    const [order, setOrder] = useState([])
    const allBooking = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASEURL}/payments/all`)
            console.log(res.data)
            setOrder(res.data)
        } catch (error) {
            console.error("Error fetching payment history:", error);

            // Handle specific error cases
            if (error.response) {
                console.error("Server Error:", error.response.data);
                console.error("Status Code:", error.response.status);

                alert(`Failed to fetch payment history: ${error.response.data.message}`);
            } else if (error.request) {
                console.error("No Response Received:", error.request);
                alert("No response received from the server. Please check your connection.");
            } else {
                console.error("Error Setting Up Request:", error.message);
                alert(`An unexpected error occurred: ${error.message}`);
            }
        }
    }
    useEffect(() => {
        allBooking()
    }, [])
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const items_Per_Page = 10;
    const indexOfLastItem = currentPage * items_Per_Page;
    const indexOfFirstItem = indexOfLastItem - items_Per_Page;
    const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

    const confirmOrder = async (item) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASEURL}/payments/${item._id}`)
            if (res.data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Order Confirmed Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            allBooking()
        } catch (error) {
            console.error("Error fetching payment history:", error);

            // Handle specific error cases
            if (error.response) {
                console.error("Server Error:", error.response.data);
                console.error("Status Code:", error.response.status);

                alert(`Failed to fetch payment history: ${error.response.data.message}`);
            } else if (error.request) {
                console.error("No Response Received:", error.request);
                alert("No response received from the server. Please check your connection.");
            } else {
                console.error("Error Setting Up Request:", error.message);
                alert(`An unexpected error occurred: ${error.message}`);
            }
        }
    }
    // delete item
    const handleDeleteItem = (item) => {
        console.log(item._id)
    }
    return (
        <div className="w-full md:w-[870px] mx-auto px-4 ">
            <h2 className="text-2xl font-semibold my-4">
                Manage All <span className="text-green">Bookings!</span>
            </h2>

            {/* menu items table  */}
            <div>
                <div className="overflow-x-auto lg:overflow-x-visible">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Transition Id</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Confirm Order</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>{item.transitionId}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        {item.status}
                                    </td>
                                    <td className="text-center">
                                        {item.status === "confirmed" ? "done" : <button
                                            className="btn bg-green text-white btn-xs text-center"
                                            onClick={() => confirmOrder(item)}
                                        >
                                            <GiConfirmed />
                                        </button>}

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
                    disabled={indexOfLastItem >= order.length}
                    className="btn btn-sm bg-green text-white"
                >
                    Next  <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default ManageBooking