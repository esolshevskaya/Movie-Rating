//src/App.jsx
import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import FilterPanel from './components/FilterPanel';
import AddMovieForm from './components/AddMovieForm';
import TrashBin from './components/TrashBin';
import DeletedMoviesModal from './components/DeletedMoviesModal';
import Notification from './components/Notification';
import './index.css'

function App() {
    function adjustFontSizeBasedOnZoom() {
        const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);

        if (zoomLevel <= 80) {
            document.documentElement.style.fontSize = '20px'; // как сейчас
        } else if (zoomLevel <= 100) {
            document.documentElement.style.fontSize = '16px';
        } else {
            document.documentElement.style.fontSize = '12px';
        }
    }

    window.addEventListener('resize', adjustFontSizeBasedOnZoom);
    window.addEventListener('load', adjustFontSizeBasedOnZoom);
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    const [movies, setMovies] = useState(() => {
        return savedMovies || [
            { id: 2, title: 'Крёстный отец', rating: 4 },
            { id: 3, title: 'Сто лет тому вперёд', rating: 5 },
            { id: 4, title: 'День сурка', rating: 3 },
        ];
    });

    const savedDeleted = JSON.parse(localStorage.getItem('deletedMovies'));
    const [deletedMovies, setDeletedMovies] = useState(() => {
        return savedDeleted || [
            { id: 1, title: 'Матрица', rating: 5 }
        ];
    });

    const [sortOrder, setSortOrder] = useState('title-asc');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [movies]);

    useEffect(() => {
        localStorage.setItem('deletedMovies', JSON.stringify(deletedMovies));
    }, [deletedMovies]);

    const updateRating = (id, newRating) => {
        setMovies(movies.map(movie =>
            movie.id === id ? { ...movie, rating: newRating } : movie
        ));
    };

    const [notification, setNotification] = useState(null);

    const addMovie = (title) => {
        const trimmedTitle = title.trim();

        const isDuplicate = movies.some(movie =>
            movie.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
        );

        if (isDuplicate) {
            setNotification(`Фильм "${trimmedTitle}" уже существует в списке!`);
            return;
        }

        const newMovie = {
            id: Date.now(),
            title: trimmedTitle,
            rating: 0
        };
        setMovies([...movies, newMovie]);
    };

    const deleteMovie = (id) => {
        const movieToDelete = movies.find(m => m.id === id);
        if (movieToDelete) {
            setDeletedMovies([...deletedMovies, movieToDelete]);
        }
        setMovies(movies.filter(movie => movie.id !== id));
    };

    const handleRestore = (movie) => {
        setDeletedMovies(deletedMovies.filter(m => m.id !== movie.id));
        setMovies([...movies, movie]);
    };

    const filteredMovies = [...movies].sort((a, b) => {
        switch (sortOrder) {
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            case 'rating-asc':
                return a.rating - b.rating;
            case 'rating-desc':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="App">
            <h1>Рейтинг фильмов</h1>
            <AddMovieForm onAdd={addMovie} />
            <FilterPanel
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <MovieList
                movies={filteredMovies}
                onRate={updateRating}
                onDelete={deleteMovie}
            />
            <TrashBin
                deletedMovies={deletedMovies}
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <DeletedMoviesModal
                    deletedMovies={deletedMovies}
                    onRestore={handleRestore}
                    onClose={() => setShowModal(false)}
                />
            )}
            {notification && (
                <Notification
                    message={notification}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
}

export default App;