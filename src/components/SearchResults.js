import React, { useState, useEffect } from 'react';

function SearchResults(props) {
    const { query } = props;

    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!query) {
            return;
        }

        fetch(
            `https://reactworkshop-api.herokuapp.com/3/search/multi?query=${query}&page=${page}`
        )
            .then(response => response.json())
            .then(data => setData(data));
    }, [query, page]);

    if (!query || !data) {
        return null;
    }

    return (
        <div className="search-results">
            <div className="search-results-header">
                <span>
                    <b>Page: </b>
                    {page}
                </span>
                {data && <span>{data.total_results} results</span>}
            </div>
            <div className="search-results-body">
                {data.results.map(show => (
                    <div key={show.id}>{show.name}</div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
