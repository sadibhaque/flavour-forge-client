import React from "react";
import Lottie from "lottie-react";
import error from "../../public/error.json";
import Navbar from "../components/Navbar";

const Error = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <Lottie animationData={error} />
            </div>
        </div>
    );
};

export default Error;
