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
        fetch(`http://localhost:5000/all-recipes/${_id}/${action}`, {
            method: "PATCH",
        })
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
                    {title}
                    <div className="badge uppercase">
                        {cuisine_type.toUpperCase()}
                    </div>
                </h2>
                <p className="flex items-center text-sm text-gray-600">
                    <button
                        onClick={handleLike}
                        className="mr-1 focus:outline-none"
                    >
                        <FaHeart className={`ml-2 my-2 text-red-500 cursor-pointer`} />
                    </button>
                    {likeCount} likes
                </p>
                <div className="card-actions justify-end">
                    <NavLink
                        to={`/recipes/${_id}`}
                        className="btn text-white btn-primary w-full"
                    >
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
