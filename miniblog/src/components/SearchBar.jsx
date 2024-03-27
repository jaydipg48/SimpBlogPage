import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('author');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFieldChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery, searchField);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={handleChange} />
                <select value={searchField} onChange={handleFieldChange}>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;


