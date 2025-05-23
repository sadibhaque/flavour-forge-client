import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const AddRecipe = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cuisineType, setCuisineType] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [categories, setCategories] = useState([]);

    const categoryOptions = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
    ];

    const handleCategoryChange = (option) => {
        setCategories((prev) =>
            prev.includes(option)
                ? prev.filter((c) => c !== option)
                : [...prev, option]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            image_url: imageUrl,
            ingredients: ingredients.split("\n").filter(Boolean),
            instructions,
            cuisine_type: cuisineType,
            prep_time: prepTime,
            categories,
            likes: 0,
            user_id: user.email || null,
        };
        console.log(newRecipe);

        fetch("http://localhost:5000/add-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Recipe Added Successfully");
                // Reset form fields
                setTitle("");
                setImageUrl("");
                setIngredients("");
                setInstructions("");
                setCuisineType("");
                setPrepTime("");
                setCategories([]);
            })
            .catch((error) => {
                console.error("Error adding recipe:", error);
            });
    };

    return (
        <>
            <div className="container mx-auto p-4 lg:max-w-6/12 min-h-screen">
                <h2 className="text-center font-bold text-2xl m-5">
                    Add New Recipe
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-base-100 p-6 rounded-lg border border-gray-300 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control w-full">
                            <label className="">
                                <span className="text-base font-medium">Recipe Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter recipe title"
                                className="input input-bordered w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="">
                                <span className="text-base font-medium">Image URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter image URL"
                                className="input input-bordered w-full"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="">
                            <span className="text-base font-medium">Ingredients</span>
                        </label>
                        <textarea
                            placeholder="Enter ingredients (one per line)"
                            className="textarea textarea-bordered h-24 w-full"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="">
                            <span className="text-base font-medium">Instructions</span>
                        </label>
                        <textarea
                            placeholder="Enter cooking instructions"
                            className="textarea textarea-bordered h-32 w-full"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control w-full">
                            <label className="">
                                <span className="text-base font-medium">Cuisine Type</span>
                            </label>
                            <select
                                className="select select-bordered w-full mb-2"
                                value={cuisineType}
                                onChange={(e) => setCuisineType(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select cuisine type
                                </option>
                                <option>Indian</option>
                                <option>Mexican</option>
                                <option>Chinese</option>
                                <option>Italian</option>
                                <option>American</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="">
                                <span className="text-base font-medium">
                                    Preparation Time (minutes)
                                </span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter preparation time"
                                className="input input-bordered w-full"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="">
                            <span className="text-base font-medium">Categories</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {categoryOptions.map((option) => (
                                <label
                                    key={option}
                                    className="cursor-pointer label"
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary w-4 h-4"
                                        checked={categories.includes(option)}
                                        onChange={() =>
                                            handleCategoryChange(option)
                                        }
                                    />
                                    <span className="label-text mr-2">
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="btn text-white btn-primary w-full">
                        Add Recipe
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddRecipe;
