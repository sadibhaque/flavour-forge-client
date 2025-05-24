import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";
import { motion } from 'motion/react';

const AllRecipes = () => {
    const recipes = useLoaderData();
    const [filter, setFilter] = useState("All");
    const cuisines = Array.from(
        new Set(recipes.map((r) => r.cuisine_type))
    ).filter(Boolean);
    const filteredRecipes =
        filter === "All"
            ? recipes
            : recipes.filter((r) => r.cuisine_type === filter);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="w-10/12 mx-auto mt-10 min-h-screen mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl  lg:text-3xl font-bold text-center my-5 mb-10">
                        All Recipes
                    </h1>
                    <select
                        className="select select-primary w-35 lg:w-48"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option className="" value="All">
                            All Cuisines
                        </option>
                        {cuisines.map((c) => (
                            <option className="" key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default AllRecipes;
