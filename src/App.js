import React, { useEffect, useState } from 'react';
import SearchResults from './components/SearchResults';

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
            <form onSubmit={handleFormSubmit}>
                <input
                    value={inputValue}
                    placeholder="please input something"
                    onChange={event => setInputValue(event.target.value)}
                ></input>
                <button type="submit">Search</button>
            </form>
            {query && <h1>Results for '{query}'</h1>}

            <SearchResults query={query} configuration={configuration} />
        </div>
    );
}

export default App;
