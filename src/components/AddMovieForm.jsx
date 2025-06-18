//src/components/AddMovieForm.jsx
import React, { useState } from 'react';
import './AddMovieForm.css'

function AddMovieForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };

    return (
        <form className="add-movie-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название фильма..."
            />
            <button type="submit">Добавить</button>
        </form>

);
}

export default AddMovieForm;
