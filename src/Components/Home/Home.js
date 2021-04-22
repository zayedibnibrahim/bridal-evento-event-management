import React from 'react';
import Footer from '../SharedComponents/Footer/Footer';
import Header from '../SharedComponents/Header/Header';
import About from './About/About';
import ContactUs from './ContactUs/ContactUs';
import Gallery from './Gallery/GalleryImg';
import HeroSection from './HeroSection/HeroSection';
import Service from './Service/Service';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <HeroSection></HeroSection>
            <Service></Service>
            <About></About>
            <Testimonials></Testimonials>
            <Gallery></Gallery>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;