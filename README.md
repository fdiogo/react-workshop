# Getting hooked to React

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
Each challenge has its own commit. Before you start the challenge you must checkout to the corresponding hash commit. Every challenge has a list of TODOs in the code to help you in the process.

### Challenge 1
Build search input with a button and text blow with the query, all this using `setState`.

**Note**: we only want to show the query once the user has submitted it.

Todos
- [Add state to the search input](./src/App.js#L32)
- [Render the submitted query](./src/App.js)

--- 

### Challenge 2

Add `useEffect` to fetch the search results.

Todos
- [Add a useEffect](./src/components/search-results/SearchResults.js)
- [Set the results in `data`](./src/components/search-results/SearchResults.js)
  
---

### Challenge 3

Implement the closing detection for modals with a `useEffect` with a cleanup

Todos
- [Add a useEffect](./src/components/modal/Modal.js)
- [Add a window mousedown listener to detect outside clicks](./src/components/modal/Modal.js)
  - **Note**: use the `wasClickOutside` function for this
- [Add a window keyup listener to detect `Escape` presses](./src/components/modal/Modal.js)

---

### Challenge 4

Memoize the cards in the search results

Todos
- [Wrap the map in a `useMemo`](./src/components/search-results/SearchResults.js)

---

### Challenge 5

Convert the value of the search input into a ref

Todos
- [Refactor the `inputValue` into a ref](./src/App.js)

---

### Challenge 6

Use refs directly on elements

Todos
- [Remove the `inputValueRef` and use a ref directly on the input]('./src/App.js)
- [Instead of `document.getElementById` use a ref]('./src/components/modal/Modal.js)

---

### Challenge 7

Instead of prop drilling the API configuration create a shared context and consume it using `useContext` directly.

Todos
- [Move the `useEffect` that fetches the configuration into a context provider](./src/App.js)
- [Add the context provider around the children in App.js]('./src/App.js)
- Remove the configuration props in the tree and connect any component that needs it to the context
- Create a custom hook that consumes the context. E.g `useConfiguration`

---

### Challenge 8

Implement the loading and error state in `SearchResults` only using `useState`

---

### Challenge 9

Convert the loading, error and data state into a single `useReducer`

---

### Challenge 10

Move the reducer inside `SearchResults` into a shared context.

---

### Challenge 11

Move the `fetch` inside the `SearchContextProvider`.


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

Add the features you would find useful and deploy your app to [netlify](https://www.netlify.com/).