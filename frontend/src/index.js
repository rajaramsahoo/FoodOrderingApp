import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import AuthProvider from "./context/AuthProvider";
import { CartProvider } from "./hooks/useCart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </CartProvider>
);
