import React, { useEffect, useState } from 'react';

import Search from './components/icons/Search';
import Popcorn from './components/icons/Popcorn';

import SearchResults from './components/search-results';

function App() {
    const [configuration, setConfiguration] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);

    const handleFormSubmit = event => {
        event.preventDefault();
        setQuery(inputValue);
    };

    useEffect(() => {
        fetch(`https://reactworkshop-api.herokuapp.com/3/configuration`)
            .then(response => response.json())
            .then(data => setConfiguration(data));
    }, []);

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
                        value={inputValue}
                        placeholder="Search"
                        onChange={event => setInputValue(event.target.value)}
                    ></input>
                </form>
            </header>
            <main>
                <SearchResults query={query} configuration={configuration} />
            </main>
        </div>
    );
}

export default App;
