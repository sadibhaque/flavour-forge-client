import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import Loading from "./Loading";
import { NavLink } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const TopRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/top-recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching top recipes:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-base-100 pb-15">
            <div className="w-10/12 mx-auto ">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-center my-6 py-10">
                        <Typewriter words={['Top Recipes']} loop={true} cursor={true} />
                    </h2>
                    <NavLink
                        to="/all-recipes"
                        className="text-1xl btn text-white btn-primary font-bold text-center "
                    >
                        See All Recipes
                    </NavLink>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopRecipes;
