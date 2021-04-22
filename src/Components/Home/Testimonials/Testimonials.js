import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel'
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
    const [allReview, setAllReview] = useState([])
    useEffect(() => {
        axios.get('https://serene-gorge-64668.herokuapp.com/showReview')
            .then(result => {
                setAllReview(result.data)
            })
    }, [])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1, itemsToScroll: 1, pagination: false },
        { width: 850, itemsToShow: 3 },
        { width: 1150, itemsToShow: 3, itemsToScroll: 1 },
        { width: 1450, itemsToShow: 3 },
        { width: 1750, itemsToShow: 3 },
      ]
    return (
        <section className="container pt-5 pb-5" id="testimonials">
            <div className="review-head">
                <h1 className="brand-text text-center">Clients Review</h1>
            </div>
            <div className="pt-5">
                <Carousel itemsToShow={3} breakPoints={breakPoints} disableArrowsOnEnd={false} enableAutoPlay={true}>
                    {
                        allReview.map(review => <TestimonialCard review={review} key={review._id}></TestimonialCard>)
                    }
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;