import React from 'react';
import BackgroundSlider from 'react-background-slider';
import slideImg1 from '../../../images/bg-slide-1.jpg';
import slideImg2 from '../../../images/bg-slide-2.jpg';
import slideImg3 from '../../../images/bg-slide-3.jpg';
const HeroSection = () => {
    return (
        <div className="hero-section container">
            
            <h1 style={{color: '#45CE96'}} className="fw-bold">WHERE <span style={{color: '#4B1E85'}}>DREAMS</span> <br />COME TRUE</h1>
            <a href="#services" className="btn brand-btn mt-4">Check Our Services</a>
            <BackgroundSlider
                images={[slideImg1, slideImg2, slideImg3]}
                duration={5} transition={2} />
        </div>
    );
};

export default HeroSection;