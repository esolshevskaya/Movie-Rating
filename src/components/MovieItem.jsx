import React from 'react';
import StarRating from './StarRating';
import './MovieItem.css'

const MovieItem = ({ movie, onRate, onDelete }) => {
    return (
        <li className="movie-item">
            <div className="movie-content">
                <span className="movie-title">{movie.title}</span>
                <div className="rating-action-container">
                    <StarRating
                        rating={movie.rating}
                        onRatingChange={(newRating) => onRate(movie.id, newRating)}
                        editable={true}
                    />
                    <button onClick={() => onDelete(movie.id)}>Удалить</button>
                </div>
            </div>
        </li>
    );
};

export default MovieItem;