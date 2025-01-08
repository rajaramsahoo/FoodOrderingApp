import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
// Create a CartContext
const CartContext = createContext();

export const CartProvider = ({ children, userEmail }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async (email) => {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token;
      const response = await axios.get(
        `http://localhost:3003/carts?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  // Function to add item to cart
  const addToCart = async (item, email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASEURL}/carts`,
        item
      );
      await fetchCartItems(email);
      setCart(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Added To Your Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response.data.message);
      const errorMessage = error.response.data.message;
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `${errorMessage}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Function to remove item from cart
  const removeFromCart = async (itemId, email) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASEURL}/carts/delete/${itemId}`
      ); // Remove item
      await fetchCartItems(email); // Fetch updated cart items
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to update an item in the cart
  const updateCartItem = (itemId, updatedItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    );
  };
  useEffect(() => {
    if (userEmail) {
      fetchCartItems(userEmail);
    }
  }, [userEmail]);
  // Provide all cart functions and state
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCartContext = () => {
  return useContext(CartContext);
};
