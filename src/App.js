import React, { useState, useEffect, useRef } from 'react';

import Search from './components/icons/Search';
import Popcorn from './components/icons/Popcorn';
import SearchResults from './components/search-results/SearchResults';

function App() {
    const inputRef = useRef();
    const [query, setQuery] = useState(null);
    const [configuration, setConfiguration] = useState(null);

    const handleFormSubmit = event => {
        event.preventDefault();
        setQuery(inputRef.current.value);
    };

    // TODO: Move this effect into a custom context provider
    useEffect(() => {
        fetch(`https://reactworkshop-api.herokuapp.com/3/configuration`)
            .then(response => response.json())
            .then(data => setConfiguration(data));
    }, []);

    return (
        // TODO: Add the custom context provider here
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
                        ref={inputRef}
                    ></input>
                </form>
            </header>
            <main>
                {query && (
                    <SearchResults
                        query={query}
                        configuration={configuration}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
