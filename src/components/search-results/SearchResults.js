import React, { useEffect, useReducer, useMemo, useState } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Movie from '../media-types/movie';
import Generic from '../media-types/generic';
import Loader from '../loader';

import Pager from '../pager';

function searchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'FETCH_SUCCESS':
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}

function SearchResults(props) {
    const { query } = props;

    const [page, setPage] = useState(1);

    // TODO: Move this into its own context provider
    const [state, dispatch] = useReducer(searchReducer, {
        error: null,
        isLoading: false,
        data: { results: [] }
    });

    // TODO: Consume the context provider here with your custom hook
    const { error, isLoading, data } = state;

    useEffect(() => {
        let canceled = false;

        dispatch({ type: 'FETCH_START' });

        const handleResolve = data => {
            if (canceled) return;
            dispatch({ type: 'FETCH_SUCCESS', data });
        };

        const handleReject = () => {
            if (canceled) return;
            dispatch({
                type: 'FETCH_ERROR',
                error: 'Could not fetch the results'
            });
        };

        const handleError = error => {
            if (canceled) return;
            dispatch({ type: 'FETCH_ERROR', error });
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
