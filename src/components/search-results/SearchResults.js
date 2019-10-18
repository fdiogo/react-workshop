import React, { useEffect, useState } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Movie from '../media-types/movie';
import Generic from '../media-types/generic';

import Pager from '../pager';

function SearchResults(props) {
    const { query, configuration } = props;

    const [page, setPage] = useState(1);
    const [data, setData] = useState({ results: [] });

    useEffect(() => {
        fetch(
            `https://reactworkshop-api.herokuapp.com/3/search/multi?query=${query}&page=${page}`
        )
            .then(response => response.json())
            .then(setData);
    }, [query, page]);

    if (!query) {
        return null;
    }

    const cards = data.results.map(media => {
        switch (media.media_type) {
            case 'tv':
                return (
                    <Tv
                        key={media.id}
                        data={media}
                        configuration={configuration}
                    />
                );
            case 'movie':
                return (
                    <Movie
                        key={media.id}
                        data={media}
                        configuration={configuration}
                    />
                );
            default:
                return (
                    <Generic
                        key={media.id}
                        data={media}
                        configuration={configuration}
                    />
                );
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
                {data && (
                    <Pager
                        current={page}
                        total={data.total_pages}
                        onChange={setPage}
                    />
                )}
            </div>
            <div className="search-results-body">{cards}</div>
        </div>
    );
}

export default SearchResults;
