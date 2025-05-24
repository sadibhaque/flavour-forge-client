import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyRecipe from "../components/MyRecipe";
import { Typewriter } from "react-simple-typewriter";
import Motion from "../components/Motion";

const MyRecipes = () => {
    const { user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (user.email) {
            fetch(
                `https://flavour-forge-server.vercel.app/my-recipes?user_id=${user.email}`
            )
                .then((res) => res.json())
                .then((data) => setRecipes(data))
                .catch((err) =>
                    console.error("Error fetching my recipes:", err)
                );
        }
    }, [user]);

    return (
        <Motion>
            <div className="min-h-screen max-w-10/12 mx-auto pb-15">
                <h2 className="text-center text-2xl font-bold my-10">
                    <Typewriter
                        words={["My Recipes"]}
                        loop={true}
                        cursor={true}
                    />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 px-4">
                    {recipes.length ? (
                        recipes.map((recipe) => (
                            <MyRecipe
                                recipe={recipe}
                                key={recipe._id}
                                onDelete={(id) => {
                                    fetch(
                                        `https://flavour-forge-server.vercel.app/my-recipes/${id}`,
                                        { method: "DELETE" }
                                    )
                                        .then((res) => res.json())
                                        .then(() =>
                                            setRecipes((prev) =>
                                                prev.filter((r) => r._id !== id)
                                            )
                                        )
                                        .catch((err) =>
                                            console.error(
                                                "Error deleting recipe:",
                                                err
                                            )
                                        );
                                }}
                                onUpdate={(id, updatedData) => {
                                    return fetch(
                                        `https://flavour-forge-server.vercel.app/all-recipes/${id}`,
                                        {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(updatedData),
                                        }
                                    )
                                        .then((res) => {
                                            if (!res.ok) {
                                                throw new Error(
                                                    "Failed to update recipe"
                                                );
                                            }
                                            return res.json();
                                        })
                                        .then(() => {
                                            // Immediately update the UI with the new data
                                            setRecipes((prev) =>
                                                prev.map((r) =>
                                                    r._id === id
                                                        ? {
                                                              ...r,
                                                              ...updatedData,
                                                          }
                                                        : r
                                                )
                                            );
                                        });
                                }}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-gray-500">
                            No recipes added yet.
                        </p>
                    )}
                </div>
            </div>
        </Motion>
    );
};

export default MyRecipes;
