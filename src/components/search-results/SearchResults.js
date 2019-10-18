import React, { useEffect, useMemo, useState } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Movie from '../media-types/movie';
import Generic from '../media-types/generic';
import Loader from '../loader';

import Pager from '../pager';

function SearchResults(props) {
    const { query } = props;

    const [page, setPage] = useState(1);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({ results: [] });

    useEffect(() => {
        let canceled = false;

        // TODO: set the appropriate state variables where you feel it's necessary

        const handleResolve = data => {
            if (canceled) return;
            setData(data);
        };

        const handleReject = () => {
            if (canceled) return;
        };

        const handleError = error => {
            if (canceled) return;
        };

        fetch(
            `https://reactworkshop-api.herokuapp.com/3/search/multi?query=${query}&page=${page}`
        )
            .then(response => response.json())
            .then(handleResolve, handleReject)
            .catch(handleError);

        return () => (canceled = true);
    }, [query, page]);

    const cards = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.results.map(media => {
            switch (media.media_type) {
                case 'tv':
                    return <Tv key={media.id} data={media} />;
                case 'movie':
                    return <Movie key={media.id} data={media} />;
                default:
                    return <Generic key={media.id} data={media} />;
            }
        });
    }, [data]);

    if (!query) {
        return null;
    }

    const isLoaded = !isLoading && !error && !!data;

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
            {error && 'Something went wrong :/'}
            {isLoading && <Loader>Fetching your media...</Loader>}
            {isLoaded && <div className="search-results-body">{cards}</div>}
        </div>
    );
}

export default SearchResults;
