import React from 'react';

import Search from './components/icons/Search';
import Popcorn from './components/icons/Popcorn';

function App() {
    const handleFormSubmit = event => {
        event.preventDefault();
        // TODO: Handle the submission of the input
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
                        // TODO: Provide a value and onChange to the input
                    ></input>
                </form>
            </header>
            <main>
                <h1>{/* TODO: Render the query */}</h1>
            </main>
        </div>
    );
}

export default App;
