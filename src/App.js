import React, { useState, useRef } from 'react';

import Search from './components/icons/Search';
import Popcorn from './components/icons/Popcorn';
import SearchResults from './components/search-results/SearchResults';

import { ConfigurationContextProvider } from './hooks/useConfiguration';

function App() {
    const inputRef = useRef();
    const [query, setQuery] = useState(null);

    const handleFormSubmit = event => {
        event.preventDefault();
        setQuery(inputRef.current.value);
    };

    return (
        <ConfigurationContextProvider>
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
                <main>{query && <SearchResults query={query} />}</main>
            </div>
        </ConfigurationContextProvider>
    );
}

export default App;
