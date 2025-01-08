// src/contexts/MenuContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";



// Create a Context
export const MenuContext = createContext();

// Create a provider component
export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASEURL}/menu`);
                setMenu(res.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };

        fetchMenu();
    }, []);

    return (
        <MenuContext.Provider value={{ menu, loading ,setMenu}}>
            {children}
        </MenuContext.Provider>
    );
};
