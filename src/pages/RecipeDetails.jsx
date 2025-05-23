import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import { FaHeart, FaList } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const RecipeDetails = () => {
    const { id } = useParams();

    const { user } = use(AuthContext);

    const [recipe, setRecipe] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/all-recipes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data);
                setLikeCount(data.likes || 0);
                // Check if recipe is already in wishlist
                // const existingWishlist =
                //     JSON.parse(localStorage.getItem("wishlist")) || [];
                // const exists = existingWishlist.some(
                //     (item) => item._id === data._id
                // );
                // setIsInWishlist(exists);
            })
            .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    const handleLike = () => {
        const action = "like";
        fetch(`http://localhost:5000/all-recipes/${id}/${action}`, {
            method: "PATCH",
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then((updatedRecipe) => {
                if (updatedRecipe && updatedRecipe.likes !== undefined) {
                    setLikeCount(updatedRecipe.likes);
                    setRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        likes: updatedRecipe.likes,
                    }));
                } else {
                    setLikeCount((prev) => prev + 1);
                    setRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        likes: (prevRecipe.likes || 0) + 1,
                    }));
                }
            })
            .catch((err) => console.error("Like error:", err));
    };

    const handleWishList = () => {
        fetch(`http://localhost:5000/add-to-wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipe, user: user.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setIsInWishlist(!isInWishlist);
                    toast.success("Recipe removed from wishlist!");
                } else {
                    toast.error("Failed to add to wishlist.");
                }
            })
            .catch((err) => console.error("Wishlist error:", err));
    };

    if (!recipe || !user) {
        return <Loading></Loading>;
    }

    const {
        title,
        image_url,
        cuisine_type,
        prep_time,
        categories,
        ingredients,
        instructions,
        user_id,
    } = recipe;

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-4 min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
                <p className="text-primary text-center mb-6">
                    {likeCount} people are interested in this recipe
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={
                                image_url ||
                                "https://via.placeholder.com/600x400?text=No+Image"
                            }
                            alt={title}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="badge text-white border-primary bg-primary uppercase">
                                {cuisine_type}
                            </span>
                            <span className="badge text-white border-primary bg-primary ">
                                {prep_time} mins
                            </span>
                            {categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="badge text-primary border-primary uppercase"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold mb-2">
                                Ingredients
                            </h2>
                            <ul className="list-disc list-inside space-y-1">
                                {ingredients.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">
                                Instructions
                            </h2>
                            <p className="whitespace-pre-line ">
                                {instructions}
                            </p>
                        </div>
                        <button
                            onClick={handleWishList}
                            disabled={isInWishlist}
                            className="btn  btn-block mb-3 flex items-center justify-center"
                        >
                            <FaList className={` mr-2`} />
                            {isInWishlist ? "In Wish List" : "Add To Wish List"}
                        </button>
                        <button
                            onClick={handleLike}
                            disabled={user_id === user.email}
                            className="btn btn-primary text-white btn-block flex items-center justify-center"
                        >
                            <FaHeart className={`text-white mr-2`} />
                            Like This Recipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
