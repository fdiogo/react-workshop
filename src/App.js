import React, { useState } from 'react';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);

    const handleFormSubmit = event => {
        event.preventDefault();
        setQuery(inputValue);
    };

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
        </div>
    );
}

export default App;
