// src/components/StarRating.jsx
import React, { useState } from 'react';
import './StarRating.css';

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick, size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "gold" : "gray"}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className="star"
    >
        <path d="M12 2L14.9 8.6L22 9.3L17 14.1L18.3 21.1L12 17.8L5.7 21.1L7 14.1L2 9.3L9.1 8.6L12 2Z" />
    </svg>
);

export default function StarRating({ rating, onRatingChange, editable = false, size = 24 }) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index) => {
        if (editable) setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (editable) setHoverRating(0);
    };

    const handleClick = (index) => {
        if (editable && onRatingChange) onRatingChange(index);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hoverRating ? star <= hoverRating : star <= rating;
                return (
                    <Star
                        key={star}
                        filled={filled}
                        size={size}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(star)}
                    />
                );
            })}
        </div>
    );
}