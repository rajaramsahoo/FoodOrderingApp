import React, { useContext, useEffect, useState } from "react";
import { useCartContext } from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
function CartPage() {
  const { cart, removeFromCart, fetchCartItems } = useCartContext();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  console.log(user);
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove from cart!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Perform the delete operation
          await removeFromCart(item._id);
          await fetchCartItems(user?.email);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The item has been deleted from your cart.",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          // Show error message
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been removed.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleIncrease = async (item) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASEURL}/carts/update/${item._id}`,
        {
          quantity: item.quantity + 1,
        }
      );
      await fetchCartItems(user?.email);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        await axios.put(
          `${process.env.REACT_APP_BASEURL}/carts/update/${item._id}`,
          {
            quantity: item.quantity - 1,
          }
        );
        await fetchCartItems(user?.email);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      handleDelete(item);
    }
  };
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  const orderTotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Banner */}
      <div
        className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%  `}
      >
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-4xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The<span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {user ? (
        <div className="">
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity </th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart &&
                    cart.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle h-10 w-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="font-medium ">{item.name}</td>
                        <td className="flex p-6   ">
                          <button
                            className="btn btn-xs"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            value={item.quantity}
                            className={`w-10 mx-2 text-center overflow-hidden appearance-none `}
                          />
                          <button
                            className="btn btn-xs"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </td>{" "}
                        <td>${calculateTotalPrice(item).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-sm border-none text-red bg-transparent"
                            onClick={() => handleDelete(item)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
            <div className="md:w-1/2 space-y-3">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: {cart.length}</p>
            <p>
              Total Price:{" "}
              <span id="total-price">${orderTotal.toFixed(2)}</span>
            </p>
            <Link to="/process-checkout" className="btn btn-md bg-green text-white px-8 py-1">
              Procceed to Checkout
            </Link>
          </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
      {/* table */}
    </div>
  );
}

export default CartPage;
