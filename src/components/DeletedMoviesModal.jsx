// src/components/DeletedMoviesModal.jsx
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import './DeletedMoviesModal.css'

function DeletedMoviesModal({ deletedMovies, onRestore, onClose }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Удалённые фильмы</h2>
                {deletedMovies.length === 0 ? (
                    <p className='bin-empty'>Корзина пуста</p>
                ) : (
                    <ul className="deleted-movies-list">
                        {deletedMovies.map(movie => (
                            <li key={movie.id} className="deleted-movie-item">
                                <div className="movie-content">
                                    <span className="movie-title">
                                        {movie.title}
                                    </span>

                                    <div className="rating-action-container">
                                        <StarRating rating={movie.rating} size={16} />
                                        {isMobile ? (
                                            <button
                                                className="restore-icon-btn"
                                                onClick={() => onRestore(movie)}
                                                title="Восстановить"
                                            >
                                                <svg
                                                    width="48"
                                                    height="48"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4 18 Q12 24 20 18"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        fill="none"
                                                    />
                                                    <path
                                                        d="M12 18 L12 6 L7 11 L12 6 L17 11 L12 6 Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                className="restore-btn"
                                                onClick={() => onRestore(movie)}
                                            >
                                                Восстановить
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button className="close-btn" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default DeletedMoviesModal;