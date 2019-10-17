import React, { useState, useMemo, useEffect } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Generic from '../media-types/generic';
import Loader from '../loader';

import Pager from '../pager';

function SearchResults(props) {
    const { query } = props;

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (!query) {
            return;
        }

        let canceled = false;

        setError(null);
        setIsLoading(true);

        const handleResolve = data => {
            !canceled && setData(data);
            setIsLoading(false);
        };

        const handleReject = () => {
            setData(null);
            setError('Could not obtain the data');
            setIsLoading(false);
        };

        const handleError = error => {
            setError(error);
            setIsLoading(false);
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
                {isLoaded && (
                    <Pager
                        current={page}
                        total={data.total_pages}
                        onChange={page => setPage(page)}
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
