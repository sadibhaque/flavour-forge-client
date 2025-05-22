import React, { useState, useEffect, use } from "react";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";

const WishList = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const user = use(AuthContext);

    useEffect(() => {
        // Clear wishlist if no user is logged in
        if (!user) {
            setWishlistItems([]);
            return;
        }

        // Get wishlist from localStorage
        const items = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistItems(items);

        // Listen for logout event to clear wishlist array
        const handleClearWishlist = () => {
            setWishlistItems([]);
        };

        window.addEventListener("clearWishlist", handleClearWishlist);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("clearWishlist", handleClearWishlist);
        };
    }, [user]); // Added user dependency to re-run effect when user changes

    const handleRemoveFromWishlist = (recipeId) => {
        // Filter out the removed recipe
        const updatedWishlist = wishlistItems.filter(
            (item) => item._id !== recipeId
        );
        // Update localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        // Update state
        setWishlistItems(updatedWishlist);
    };

    return (
        <div className="bg-base-100 min-h-screen">
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    My Wish List
                </h2>
                {wishlistItems.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>Your wishlist is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="card bg-base-100 shadow-xl"
                            >
                                <figure className="relative">
                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </figure>
                                <div className="card-body bg-base-300">
                                    <h2 className="card-title">
                                        {recipe.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {recipe.cuisine_type}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <Link
                                            to={`/recipes/${recipe._id}`}
                                            className="btn text-white btn-primary btn-sm"
                                        >
                                            View Recipe
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleRemoveFromWishlist(
                                                    recipe._id
                                                )
                                            }
                                            className="btn bg-red-500 text-white btn-sm"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;
