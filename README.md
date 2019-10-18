# Getting hooked to React

This is a web app that consumes the MovieDB API. You can check the API docs [here](https://developers.themoviedb.org/3)

We're using a proxy server for the API which automatically injects an `api_key` query parameter so you don't have to ask for your own. This is its url: https://reactworkshop-api.herokuapp.com/

If you would like to continue this afterwards don't forget to change all API calls into the original API: https://api.themoviedb.org/

## Requirements
- **Node**: >= 10.16.0
- **Yarn**: >= 1.19.0

## Setup

#### Clone the repository
> git clone [git@github.com:fdiogo/react-workshop.git](https://github.com/fdiogo/react-workshop.git)

#### If you have nvm installed, then run:
> nvm use

#### Install dependencies
> yarn install

#### Run the project
> yarn start


## Challenges
Each challenge has its own branch. Before you start the challenge you must checkout to the corresponding branch. Before you move on to the next challenge first do `git stash -u` so that you can later continue if you want. Every challenge has a list of todos in the code to help you in the process.

### Challenge 1
Build search input with a button and text blow with the query, all this using `setState`.

**Branch**: challenge1

**Note**: we only want to show the query once the user has submitted it.

Todos
- [Provide the necessary props to the input](./src/App.js#L23)
- [Handle the submission of the input](./src/App.js#L9)
- [Render the submitted query](./src/App.js#L28)

--- 

### Challenge 2

Add `useEffect` to fetch the search results.

**Branch**: challenge2

Todos
- [Add a useEffect](./src/components/search-results/SearchResults.js#L12)
- [Set the results in `data`](./src/components/search-results/SearchResults.js#L9)
  
---

### Challenge 3

Implement the closing detection for modals with a `useEffect` with a cleanup

**Branch**: challenge3

Todos
- [Add a useEffect](./src/components/modal/Modal.js#L17)
- Add a window mousedown listener to detect outside clicks
  - **Note**: use the [`wasClickOutside`](./src/components/modal/Modal.js#L8) function for this
- Add a window keyup listener to detect `Escape` presses

---

### Challenge 4

Memoize the cards in the search results

**Branch**: challenge4

Todos
- [Wrap the map in a `useMemo`](./src/components/search-results/SearchResults.js#L28)

---

### Challenge 5

Convert the value of the search input into a ref

**Branch**: challenge5

Todos
- [Change the `inputValue` to a ref](./src/App.js#L8)

---

### Challenge 6

Use refs directly on elements

**Branch**: challenge6

Todos
- [Remove the `inputValueRef` and use a ref directly on the input]('./src/App.js#L8)
- [Instead of `document.getElementById` use a ref]('./src/components/modal/Modal.js#L17)

---

### Challenge 7

Instead of prop drilling the API configuration create a shared context and consume it using `useContext` directly.

**Branch**: challenge7

Todos
- [Move the `useEffect` that fetches the configuration into a context provider](./src/App.js#L17)
- [Add the context provider around the children in App.js]('./src/App.js#L25)
- Remove the configuration props in the tree and connect any component that needs it to the context
- Create a custom hook that consumes the context. E.g `useConfiguration`

---

### Challenge 8

Implement the loading and error state in `SearchResults` only using `useState`

**Branch**: challenge8

Todos
- [Set the appropriate state variables where you feel it's necessary](./src/components/search-results/SearchResults.js#L23)

---

### Challenge 9

Convert the loading, error and data state into a single `useReducer`

**Branch**: challenge9

Todos
- [Change the 3 state variables into a single useReducer](./src/components/search-results/SearchResults.js#L16)

---

### Challenge 10

Move the reducer inside `SearchResults` into a shared context.

**Branch**: challenge10

- [Move the reducer into its own context provider](./src/components/search-results/SearchResults.js#L41)
- [Wrap the app with the context provider]('./src/App.js#L20')
- [Consume the context using your custom hook](./src/components/search-results/SearchResults.js#L48)

---

### Challenge 11

Move the `fetch` inside the `SearchContextProvider`.

**Branch**: challenge11

- [Move the fetch code into `SearchContextProvider`](./src/components/search-results/SearchResults.js#L24)
- [Instead of `dispatch` return an object with your own custom actions](./src/hooks/useSearch.js#L37)
- [Use the new function in SearchContextProvider](./src/components/search-results/SearchResults.js#L52)

# Future work

We left you some suggestions for future work on this project if you feel like.
These don't have solutions made by us so they're completely up to you.


### Challenge 12

Add caching to the search reducer.

**Hint**: Use the page and query to determine if you already have the data in memory.

---

### Challenge 13

Implement a component to render the `people` media type.

---

### Challenge 14

Add a button to add a tv show or movie to your favorites.

Links:
- [Adding as favorite](https://developers.themoviedb.org/3/account/mark-as-favorite)

---

### Challenge 15

Implement the favorites page.

---

### Challenge 16

Add a button to add a tv show or movie to your watchlist.

Links:
- [Adding to the watchlist](https://developers.themoviedb.org/3/account/add-to-watchlist)

---

### Challenge 17

Implement the watchlist page.

---

### Challenge 18

Add filters for the type of media you'd like to search for.

Links:
- [Searching for movies](https://developers.themoviedb.org/3/search/search-movies)
- [Searching for TV shows](https://developers.themoviedb.org/3/search/search-tv-shows)
- [Searching for people](https://developers.themoviedb.org/3/search/search-people)

---

### Challenge 19

Add a `discover` page

---

### Challenge 20

Add the features you would find useful and deploy your app to [netlify](https://www.netlify.com/) or other cloud services.