import React from "react";

const CookingSection = () => {
    const features = [
        {
            title: "Quick Meals",
            description:
                "Delicious recipes ready in 30 minutes or less, perfect for busy weeknights.",
            button: "Explore Quick Meals",
        },
        {
            title: "Healthy Options",
            description:
                "Nutritious and flavorful recipes to keep you energized and feeling great.",
            button: "Discover Healthy Recipes",
        },
        {
            title: "Dessert Delights",
            description:
                "Indulge in sweet treats from simple cookies to impressive cakes and pastries.",
            button: "Browse Desserts",
        },
    ];

    return (
        <section className="py-16 bg-base-300 text-center">
            <div className="max-w-10/12 mx-auto px-4">
                <h2 className="text-3xl font-bold text-base-content mb-2">
                    Cooking Made Simple
                </h2>
                <p className="text-base-content/70 mb-12">
                    Discover the joy of cooking with our easy-to-follow recipes
                    and helpful cooking tips.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow-sm hover:shadow-lg transition"
                        >
                            <figure className="bg-base-300 h-40 w-full flex items-center justify-center">
                                <span className="text-base-content/50">
                                    [Image Placeholder]
                                </span>
                            </figure>
                            <div className="card-body text-left">
                                <h3 className="text-lg font-semibold text-base-content">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {feature.description}
                                </p>
                                <div className="mt-4">
                                    <button className="btn btn-outline w-full">
                                        {feature.button}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CookingSection;
