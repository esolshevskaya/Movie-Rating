//src/components/FilterPanel.jsx
import React from 'react';
import './FilterPanel.css'

function FilterPanel({ sortOrder, setSortOrder }) {
    return (
        <div className="filter-panel">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="title-asc">Название А-Я</option>
                <option value="title-desc">Название Я-А</option>
                <option value="rating-asc">Рейтинг ↑</option>
                <option value="rating-desc">Рейтинг ↓</option>
            </select>
        </div>
    );
}

export default FilterPanel;