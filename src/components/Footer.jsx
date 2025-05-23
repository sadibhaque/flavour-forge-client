import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterestP,
} from "react-icons/fa";
import { TbToolsKitchen } from "react-icons/tb";
import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content pt-10">
            <div className="max-w-10/12 text-center mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-base-300">
                {/* Logo & About */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                        <span className="text-2xl text-primary">
                            <TbToolsKitchen />
                        </span>
                        <a className=" font-bold text-xl">FlavourForge</a>
                    </div>
                    <p className="mt-2 text-sm text-base-content/70">
                        A user-friendly recipe platform where food enthusiasts
                        share culinary creations and discover new flavors.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <NavLink to="/" className="link link-hover">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-recipes" className="link link-hover">All Recipes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/add-recipe" className="link link-hover">Add Recipe</NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-recipes" className="link link-hover">My Recipes</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold mb-2">Contact Us</h3>
                    <ul className="text-sm space-y-1 text-base-content/70">
                        <li>Email: info@flavourforge.com</li>
                        <li>Phone: +880123-4567</li>
                        <li>Address: 123 Cooking St, Food City</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4 mt-2 text-primary">
                        <a className="text-xl hover:text-primary" href="#">
                            <FaFacebookF />
                        </a>
                        <a className="text-xl hover:text-primary" href="#">
                            <FaTwitter />
                        </a>
                        <a className="text-xl hover:text-primary" href="#">
                            <FaInstagram />
                        </a>
                        <a className="text-xl hover:text-primary" href="#">
                            <FaPinterestP />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center py-4 text-sm text-base-content/60">
                © 2025 FlavourForge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
