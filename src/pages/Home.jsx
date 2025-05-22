import React from "react";
import Banner from "../components/Banner";
import CommunitySection from '../components/CommunitySection';
import CookingSection from '../components/CookingSection';
import TopRecipes from '../components/TopRecipes';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopRecipes></TopRecipes>
            <CookingSection></CookingSection>
            <CommunitySection></CommunitySection>
        </div>
    );
};

export default Home;
