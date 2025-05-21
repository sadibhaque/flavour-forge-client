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
        document.body.setAttribute("data-theme", isLight ? "light" : "dark");
    }, [isLight]);

    return (
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;