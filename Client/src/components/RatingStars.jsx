import React from 'react';

const RatingStars = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            // Full star
            stars.push(<span key={i} className="ri-star-fill"></span>);
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            // Half star
            stars.push(<span key={i} className="ri-star-half-line"></span>);
        } else {
            // Empty star
            stars.push(<span key={i} className="ri-star-line"></span>);
        }
    }

    return <div className='product__rating'>{stars}</div>;
};

export default RatingStars;
