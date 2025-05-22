import React, { useEffect } from 'react';
import { createContext, useState } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

    const [isLight, setIsLight] = useState(() => {
        const savedTheme = localStorage.getItem("isLight");
        return savedTheme !== null ? JSON.parse(savedTheme) : true;
    });

    useEffect(() => {
        localStorage.setItem("isLight", JSON.stringify(isLight));
    }, [isLight]);


    useEffect(() => {
        document.getElementsByTagName("html")[0].setAttribute("data-theme", isLight ? "light" : "dark");
        // document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
    }, [isLight]);

    return (
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;