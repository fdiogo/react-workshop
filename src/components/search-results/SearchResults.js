import React, { useState, useMemo, useEffect } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Generic from '../media-types/generic';

import Pager from '../pager';

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

        return data.results.map(media => {
            switch (media.media_type) {
                case 'tv':
                    return <Tv key={media.id} data={media} />;
                default:
                    return <Generic key={media.id} data={media} />;
            }
        });
    }, [data]);

    if (!query || !data) {
        return null;
    }

    return (
        <div className="search-results">
            <div className="search-results-header">
                {query && (
                    <h1 className="search-results-query">
                        Results for '{query}'
                    </h1>
                )}
                <Pager
                    current={page}
                    total={data.total_pages}
                    onChange={page => setPage(page)}
                />
            </div>
            <div className="search-results-body">{cards}</div>
        </div>
    );
}

export default SearchResults;
