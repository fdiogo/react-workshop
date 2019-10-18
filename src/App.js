import React, { useState } from 'react';

import Search from './components/icons/Search';
import Popcorn from './components/icons/Popcorn';
import SearchResults from './components/search-results/SearchResults';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);

    const handleFormSubmit = event => {
        event.preventDefault();
        setQuery(inputValue);
    };

    return (
        <div className="app">
            <header>
                <Popcorn className="header-logo" />
                <button className="header-link">Favorites</button>
                <button className="header-link">Watchlist</button>
                <form className="header-search" onSubmit={handleFormSubmit}>
                    <Search className="header-search-icon" />
                    <input
                        className="header-search-input"
                        placeholder="Search"
                        value={inputValue}
                        onChange={event => setInputValue(event.target.value)}
                    ></input>
                </form>
            </header>
            <main>{query && <SearchResults query={query} />}</main>
        </div>
    );
}

export default App;
