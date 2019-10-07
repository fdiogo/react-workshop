import React, { useState, useMemo, useEffect } from 'react';

import Generic from './media-types/Generic';

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

    const cards = useMemo(() => {
        if (!data) {
            return null;
        }

        return data.results.map(media => (
            <Generic key={media.id} data={media} />
        ));
    }, [data]);

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
            <div className="search-results-body">{cards}</div>
        </div>
    );
}

export default SearchResults;
