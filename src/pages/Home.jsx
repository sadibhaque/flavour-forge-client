import React from "react";
import Banner from "../components/Banner";
import CommunitySection from '../components/CommunitySection';
import CookingSection from '../components/CookingSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CookingSection></CookingSection>
            <CommunitySection></CommunitySection>
        </div>
    );
};

export default Home;
