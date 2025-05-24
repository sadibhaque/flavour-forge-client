import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { NavLink } from "react-router";

const RecipeCard = ({
    recipe: { _id, title, image_url, cuisine_type, likes },
}) => {
    const [likeCount, setLikeCount] = useState(likes || 0);
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        const action = liked ? "unlike" : "like";
        fetch(
            `https://flavour-forge-server.vercel.app/all-recipes/${_id}/${action}`,
            {
                method: "PATCH",
            }
        )
            .then((res) => res.json())
            .then((updated) => {
                setLikeCount(updated.likes);
                setLiked((prev) => !prev);
            })
            .catch((err) => console.error("Like error:", err));
    };
    return (
        <div className="card bg-base-300 shadow-md">
            <figure>
                <img
                    src={
                        image_url ||
                        "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={title}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex items-center justify-between">
                    <span className="text-sm">{title}</span>
                    <div className="text-xs p-1 rounded bg-base-100">{cuisine_type}</div>
                </h2>
                <p className="flex items-center text-sm text-gray-600">
                    <button
                        onClick={handleLike}
                        className="mr-1 focus:outline-none"
                    >
                        <FaHeart
                            className={`ml-2 my-2 text-red-500 cursor-pointer`}
                        />
                    </button>
                    {likeCount} likes
                </p>
                <div className="card-actions justify-end">
                    <NavLink
                        to={`/recipes/${_id}`}
                        className="btn text-white text-xs lg:text-sm btn-primary w-full"
                    >
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
