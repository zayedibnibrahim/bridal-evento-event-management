import React from 'react';
import Footer from '../SharedComponents/Footer/Footer';
import Header from '../SharedComponents/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import Service from './Service/Service';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <HeroSection></HeroSection>
            <Service></Service>
            <Footer></Footer>
        </div>
    );
};

export default Home;