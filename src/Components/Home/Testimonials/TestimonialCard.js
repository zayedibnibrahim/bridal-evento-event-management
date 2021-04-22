import { Rating } from '@material-ui/lab';
import React from 'react';

const TestimonialCard = ({ review }) => {
    return (
        <div>
            <div className="user-img">
                <img src={review.photo} alt="" className="img-fluid" />
            </div>
            <div className="user-review">
                <Rating name="read-only" value={review.rating} readOnly />
                <h6>{review.name}</h6>
                <p>{review.review}</p>
            </div>
        </div>
    );
};

export default TestimonialCard;