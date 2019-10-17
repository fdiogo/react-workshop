import React, { useState, useMemo, useEffect } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Generic from '../media-types/generic';
import Loader from '../loader';

import Pager from '../pager';
import useSearch from '../../hooks/useSearch';

function SearchResults(props) {
    const { query } = props;

    const [page, setPage] = useState(1);

    const [state, dispatch] = useSearch();
    const { isLoading, data, error } = state;

    useEffect(() => {
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (!query) {
            return;
        }

        let canceled = false;

        dispatch({ type: 'FETCH_START' });

        const handleResolve = data => {
            if (canceled) return;

            dispatch({ type: 'FETCH_SUCCESS', data });
        };

        const handleReject = () => {
            if (canceled) return;

            dispatch({
                type: 'FETCH_FAILURE',
                error: 'Could not obtain the data'
            });
        };

        const handleError = error => {
            if (canceled) return;

            dispatch({ type: 'FETCH_FAILURE', error });
        };

        fetch(
            `https://reactworkshop-api.herokuapp.com/3/search/multi?query=${query}&page=${page}`
        )
            .then(response => response.json())
            .then(handleResolve, handleReject)
            .catch(handleError);

        return () => (canceled = true);
    }, [query, page, dispatch]);

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
