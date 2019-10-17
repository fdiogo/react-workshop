import React, { useState, useMemo, useEffect } from 'react';
import './SearchResults.css';

import Tv from '../media-types/tv';
import Movie from '../media-types/movie';
import Generic from '../media-types/generic';
import Loader from '../loader';

import Pager from '../pager';
import useSearch from '../../hooks/useSearch';

function SearchResults(props) {
    const { query } = props;

    const [searchOptions, setSearchOptions] = useState({ query, page: 1 });

    const {
        isLoading,
        error,
        data,
        actions: { search }
    } = useSearch();

    useEffect(() => {
        setSearchOptions({ query, page: 1 });
    }, [query]);

    useEffect(() => {
        if (!searchOptions.query) {
            return;
        }

        search(searchOptions.query, searchOptions.page);
    }, [search, searchOptions]);

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
                        disabled={isLoading}
                        current={searchOptions.page}
                        total={data.total_pages}
                        onChange={page =>
                            setSearchOptions(options => ({ ...options, page }))
                        }
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
