import React from 'react';
import MovieItem from './MovieItem';
import './MovieItem.css'

const MovieList = ({ movies, onRate, onDelete }) => {
    return (
        <ul className="movie-list">
            {movies.map(movie => (
                <MovieItem
                    key={movie.id}
                    movie={movie}
                    onRate={onRate}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default MovieList;