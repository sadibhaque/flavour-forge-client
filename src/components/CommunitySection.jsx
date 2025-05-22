import React from "react";

const CommunitySection = () => {
    const members = [
        {
            name: "Rafsan Ahmed",
            role: "Chef",
            imgUrl: "https://i.ibb.co/C3FFbqkk/image.png",
            quote: "Recipe Book has transformed my cooking experience. I've discovered so many amazing recipes and love sharing my own creations with the community!",
        },
        {
            name: "Tanvir Khan",
            role: "Food Blogger",
            imgUrl: "https://i.ibb.co/Pv6wx6J9/image.png",
            quote: "As a food blogger, I appreciate the clean interface and ease of sharing recipes. The community feedback has helped me improve my cooking skills.",
        },
        {
            name: "Emily Rodriguez",
            role: "Culinary Student",
            imgUrl: "https://i.ibb.co/qYXgrLhf/image.png",
            quote: "This platform has been invaluable for my culinary education. I can practice different cuisines and get inspiration from experienced cooks.",
        },
        {
            name: "David Wilson",
            role: "Busy Parent",
            imgUrl: "https://i.ibb.co/wFJZy49j/image.png",
            quote: "The quick meal section has been a lifesaver for our busy family. We've found so many delicious recipes that our kids actually enjoy!",
        },
    ];

    return (
        <section className="py-16 bg-base-100 text-center transition-colors duration-300">
            <div className="max-w-10/12 mx-auto px-4">
                <h2 className="text-3xl font-bold text-base-content mb-2">
                    Our Community
                </h2>
                <p className="text-base-content/70 mb-12">
                    Join thousands of food enthusiasts sharing their culinary
                    journeys and discovering new recipes every day.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow-md hover:shadow-lg transition"
                        >
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-base-300 mb-4">
                                    <img
                                        className="w-full h-full rounded-full"
                                        src={member.imgUrl}
                                        alt=""
                                    />
                                </div>
                                <h3 className="card-title text-base-content">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-base-content/60">
                                    {member.role}
                                </p>
                                <p className="text-sm text-base-content mt-2">
                                    "{member.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
