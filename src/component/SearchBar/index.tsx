import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search projects"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
