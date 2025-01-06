import React, { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"))?.user;

  const [user, setUser] = useState(storedUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
