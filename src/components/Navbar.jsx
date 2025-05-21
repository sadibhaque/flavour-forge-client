import React, { useContext } from 'react';
import { TbToolsKitchen } from "react-icons/tb";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from '../contexts/ThemeProvider';
import { NavLink } from 'react-router';

const Navbar = () => {
    const { isLight, setIsLight } = useContext(ThemeContext);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsLight(!isLight);
    }

    const nav_ul = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "bg-primary rounded text-white" : ""
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-recipes"
                    className={({ isActive }) =>
                        isActive ? "bg-primary rounded text-white" : ""
                    }
                >
                    All Recipes
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add-recipe"
                    className={({ isActive }) =>
                        isActive ? "bg-primary rounded text-white" : ""
                    }
                >
                    Add Recipe
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-recipes"
                    className={({ isActive }) =>
                        isActive ? "bg-primary rounded text-white" : ""
                    }
                >
                    My Recipes
                </NavLink>
            </li>
        </>
    );
    
    return (
        <div>
            <div className="navbar bg-base-100 max-w-10/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />{" "}
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="font-bold menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {nav_ul}
                        </ul>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl text-primary">
                            <TbToolsKitchen />
                        </span>
                        <a className=" font-bold text-xl">FlavourForge</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="font-bold menu menu-horizontal px-1">
                        {nav_ul}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    <div onClick={handleToggle} className="mx-2">
                        {isLight ? (
                            <div className="text-2xl">
                                <MdDarkMode />
                            </div>
                        ) : (
                            <div className="text-2xl">
                                <MdLightMode />
                            </div>
                        )}
                    </div>
                    <NavLink
                        to="/auth/register"
                        className="btn bg-gray-100 text-black"
                    >
                        Sign Up
                    </NavLink>
                    <NavLink
                        to="/auth/login"
                        className="btn bg-primary text-white"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;