import React, { useMemo, useReducer, useContext } from 'react';

const SearchContext = React.createContext();

function searchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return {
                isLoading: true,
                error: null,
                data: null
            };
        case 'FETCH_SUCCESS':
            return {
                isLoading: false,
                error: null,
                data: action.data
            };
        case 'FETCH_ERROR':
            return {
                isLoading: false,
                error: action.error,
                data: null
            };
        default:
            return state;
    }
}

function SearchContextProvider(props) {
    const [state, dispatch] = useReducer(searchReducer, {
        isLoading: false,
        error: null,
        data: null
    });

    const actions = useMemo(
        () => ({
            search: (query, page = 1) => {
                dispatch({ type: 'FETCH_START' });

                const handleResolve = data => {
                    dispatch({ type: 'FETCH_SUCCESS', data });
                };

                const handleReject = () => {
                    dispatch({
                        type: 'FETCH_FAILURE',
                        error: 'Could not obtain the data'
                    });
                };

                const handleError = error => {
                    dispatch({ type: 'FETCH_FAILURE', error });
                };

                fetch(
                    `https://reactworkshop-api.herokuapp.com/3/search/multi?query=${query}&page=${page}`
                )
                    .then(response => response.json())
                    .then(handleResolve, handleReject)
                    .catch(handleError);
            }
        }),
        []
    );

    const context = useMemo(
        () => ({
            ...state,
            actions
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state]
    );

    return <SearchContext.Provider value={context} {...props} />;
}

function useSearch() {
    return useContext(SearchContext);
}

export default useSearch;
export { useSearch, SearchContext, SearchContextProvider };
