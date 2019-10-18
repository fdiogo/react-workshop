import React, { useState } from 'react';
import './SearchResults.css';

import Generic from '../media-types/generic';

function SearchResults(props) {
    const { query } = props;

    // TODO: use setData to set the results
    const [data, setData] = useState({ results: [] });

    // TODO: add a useEffect to fetch

    if (!query) {
        return null;
    }

    const cards = data.results.map(media => {
        switch (media.media_type) {
            default:
                return <Generic key={media.id} data={media} />;
        }
    });

    return (
        <div className="search-results">
            <div className="search-results-header">
                {query && (
                    <h1 className="search-results-query">
                        Results for '{query}'
                    </h1>
                )}
            </div>
            <div className="search-results-body">{cards}</div>
        </div>
    );
}

export default SearchResults;
