"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyRecipe = ({ recipe, onDelete, onUpdate }) => {
    const {
        _id,
        title,
        image_url,
        cuisine_type,
        prep_time,
        categories = [],
        ingredients = [],
        instructions,
        likes,
    } = recipe;

    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        title,
        image_url,
        cuisine_type,
        prep_time,
        categories: categories.join(", "),
        ingredients: Array.isArray(ingredients)
            ? ingredients.join(", ")
            : ingredients,
        instructions,
    });

    const predefinedCategories = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Vegan",
        "Vegetarian",
        "Gluten-Free",
    ];

    const cuisineTypes = [
        "Bengali",
        "Mexican",
        "Chinese",
        "Italian",
        "American",
    ];

    const handleCategoryChange = (category, isChecked) => {
        setFormValues((prev) => {
            const currentCategories = prev.categories
                .split(",")
                .map((c) => c.trim())
                .filter((c) => c !== "");

            const newCategories = isChecked
                ? [...currentCategories, category]
                : currentCategories.filter((c) => c !== category);

            return { ...prev, categories: newCategories.join(", ") };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRecipe = {
            title: formValues.title,
            image_url: formValues.image_url,
            cuisine_type: formValues.cuisine_type,
            prep_time: formValues.prep_time,
            categories: formValues.categories.split(",").map((s) => s.trim()),
            ingredients: formValues.ingredients.split(",").map((s) => s.trim()),
            instructions: formValues.instructions,
        };
        onUpdate(_id, updatedRecipe);
        setShowModal(false);
    };

    const isCategorySelected = (category) => {
        return formValues.categories
            .split(",")
            .map((c) => c.trim())
            .includes(category);
    };

    return (
        <>
            <div className="card bg-base-300 w-full shadow-md rounded-lg overflow-hidden mx-auto">
                <figure>
                    <img
                        src={image_url || null}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge bg-primary uppercase text-white">
                            {cuisine_type}
                        </span>
                        <button className="badge bg-primary uppercase text-white">
                            {prep_time} mins
                        </button>
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="badge uppercase"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold  text-xl">Ingredients:</h3>
                        <p>
                            {Array.isArray(ingredients)
                                ? ingredients.join(", ")
                                : ingredients}
                        </p>
                    </div>
                    <div className="mt-2">
                        <h3 className="font-semibold text-xl">Instructions:</h3>
                        <p>{instructions}</p>
                    </div>
                    <p className="mt-4 font-semibold text-xl">Likes: {likes || 0}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-sm gap-2"
                        >
                            <FaEdit /> Update
                        </button>
                        <button
                            onClick={() => onDelete(_id)}
                            className="text-white btn bg-red-600 btn-sm gap-2"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
                    <div
                        className="bg-base-100 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className=" p-4">
                            <h2 className="text-xl text-center font-bold">
                                Update Recipe
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 ">
                                    Image URL
                                </label>
                                <input
                                    name="image_url"
                                    value={formValues.image_url}
                                    onChange={handleChange}
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 ">
                                        Cuisine Type
                                    </label>
                                    <select
                                        name="cuisine_type"
                                        value={formValues.cuisine_type}
                                        onChange={handleChange}
                                        className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                    >
                                        <option value="">
                                            Select cuisine type
                                        </option>
                                        {cuisineTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 ">
                                        Prep Time (mins)
                                    </label>
                                    <input
                                        name="prep_time"
                                        value={formValues.prep_time}
                                        onChange={handleChange}
                                        className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Categories
                                </label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    {predefinedCategories.map((category) => (
                                        <label
                                            key={category}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isCategorySelected(
                                                    category
                                                )}
                                                onChange={(e) =>
                                                    handleCategoryChange(
                                                        category,
                                                        e.target.checked
                                                    )
                                                }
                                                className="checkbox checkbox-sm"
                                            />
                                            <span>{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Ingredients
                                </label>
                                <input
                                    name="ingredients"
                                    value={formValues.ingredients}
                                    onChange={handleChange}
                                    placeholder="Separate with commas"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Instructions
                                </label>
                                <textarea
                                    name="instructions"
                                    value={formValues.instructions}
                                    onChange={handleChange}
                                    rows="4"
                                    className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4  mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline btn-sm hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-sm bg-primary text-white border-none hover:opacity-90 transition-opacity"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyRecipe;
