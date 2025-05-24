"use client";
import React from "react";
import Banner from "../components/Banner";
import CommunitySection from "../components/CommunitySection";
import CookingSection from "../components/CookingSection";
import TopRecipes from "../components/TopRecipes";
import { motion } from "motion/react";

// used motion because react awesome library is not working in my project

const Home = () => {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Banner />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <TopRecipes />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <CookingSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <CommunitySection />
            </motion.div>
        </div>
    );
};

export default Home;
