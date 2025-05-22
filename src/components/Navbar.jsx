import React, { use, useContext } from "react";
import { TbToolsKitchen } from "react-icons/tb";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../contexts/ThemeProvider";
import { NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import WishList from "../pages/WishList";

const Navbar = () => {
    const { isLight, setIsLight } = useContext(ThemeContext);

    const { user, logoutUser } = use(AuthContext);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsLight(!isLight);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser()
            .then(() => {
                console.log("Successfully Signed Out!");
                // Clear wishlist array from memory by triggering a custom event
                window.dispatchEvent(new CustomEvent("clearWishlist"));
                toast.success("Logged Out !");
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
            {user && (
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
            )}
            {user && (
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
            )}
            {user && (
                <li>
                    <NavLink
                        to="/wish-list"
                        className={({ isActive }) =>
                            isActive ? "bg-primary rounded text-white" : ""
                        }
                    >
                        Wish List
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-base-300">
            <div className="navbar max-w-10/12 shadow-b mx-auto">
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
                            <div onClick={handleToggle} className="m-5 mx-auto">
                                {isLight ? (
                                    <div className="text-2xl text-center">
                                        <MdDarkMode />
                                    </div>
                                ) : (
                                    <div className="text-2xl text-center">
                                        <MdLightMode />
                                    </div>
                                )}
                            </div>
                            {nav_ul}
                        </ul>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-2xl text-primary">
                            <TbToolsKitchen />
                        </span>
                        <a className="hidden lg:block font-bold text-xl">
                            FlavourForge
                        </a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="font-bold menu menu-horizontal px-1">
                        {nav_ul}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                    {user ? (
                        <div className="navbar-end mr-2 flex gap-2">
                            <div
                                onClick={handleToggle}
                                className="mx-2 hidden lg:block text-primary"
                            >
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
                            <div>
                                <div className="dropdown flex items-center">
                                    <div
                                        tabIndex={1}
                                        role="button"
                                        className=""
                                    >
                                        <img
                                            className="w-10 rounded-full"
                                            src={user.photoURL}
                                            alt=""
                                        />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-primary rounded-box right-1 top-11 mt-3 w-80 p-2 shadow"
                                    >
                                        <div className="p-3">
                                            <h2 className="font-medium text-white text-2xl text-center">
                                                {user.displayName}
                                            </h2>
                                            <h2 className="font-medium text-lg py-2 text-white text-center">
                                                {user.email}
                                            </h2>
                                            <NavLink
                                                onClick={handleLogout}
                                                className="btn border-none bg-white text-black w-full"
                                            >
                                                Logout
                                            </NavLink>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <div
                                onClick={handleToggle}
                                className="mx-2 hidden lg:block"
                            >
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
                            <NavLink to="/auth/login" className="btn">
                                Login
                            </NavLink>
                            <NavLink
                                to="/auth/register"
                                className="btn bg-primary text-white"
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
