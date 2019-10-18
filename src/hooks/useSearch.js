import React, { useMemo, useReducer, useContext } from 'react';

const SearchContext = React.createContext();

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

function SearchContextProvider(props) {
    const [state, dispatch] = useReducer(searchReducer, {
        isLoading: false,
        error: null,
        data: null
    });

    // TODO: Instead of dispatch return an object with your own custom actions
    const context = useMemo(() => [state, dispatch], [state]);

    return <SearchContext.Provider value={context} {...props} />;
}

function useSearch() {
    return useContext(SearchContext);
}

export default useSearch;
export { useSearch, SearchContext, SearchContextProvider };
