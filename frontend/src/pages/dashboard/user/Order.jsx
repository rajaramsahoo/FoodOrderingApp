import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import axios from 'axios';
const Order = () => {
    const { user } = useContext(AuthContext)
    const [orderHistory, setOrderHistory] = useState([])
    const userPaymentHistory = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASEURL}/payments?email=${user?.email}`)
            console.log(res.data)
            setOrderHistory(res.data)
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
        userPaymentHistory()
    }, [user])
    // date format
    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString(); // You can adjust options as needed
    };
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            {/* banner */}
            <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Track Your All<span className="text-green"> Orders</span>
                        </h2>
                    </div>
                </div>
            </div>
            <div>
                {
                    <div>
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table text-center">
                                    {/* head */}
                                    <thead className="bg-green text-white rounded-sm">
                                        <tr>
                                            <th>#</th>
                                            <th>Order Date</th>
                                            <th>transitionId</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderHistory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{formatDate(item.createdAt)}</td>
                                                <td className="font-medium">{item.transitionId}</td>
                                                <td>${item.price}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                                                        Contact
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* foot */}
                                </table>
                            </div>
                        </div>
                        <hr />
                    </div>
                }
            </div>
        </div>
    )
}

export default Order